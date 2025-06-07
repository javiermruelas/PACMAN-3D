# 3D Pacman Game Design Document

**Angular + Three.js Implementation**

## 1. Game Overview

### Core Concept

A 3D interpretation of the classic Pacman game featuring:

- Isometric or first-person 3D perspective
- Animated 3D assets created with Three.js
- Modern UI overlay built with Angular
- Classic gameplay mechanics adapted for 3D space

### Technical Stack

- **Frontend Framework**: Angular 17+
- **3D Engine**: Three.js
- **State Management**: Angular Services/RxJS
- **Styling**: Angular Material/CSS Grid

## 2. Architecture Overview

### Component Structure

```
PacmanGameComponent (Root)
├── GameCanvasComponent (Three.js Scene)
├── GameUIComponent (HUD Overlay)
├── MenuComponent (Start/Pause/Game Over)
└── SettingsComponent (Audio/Graphics)
```

### Service Architecture

```
GameStateService (Central game state)
├── PlayerService (Pacman logic)
├── GhostService (AI and behavior)
├── MapService (Level data and collision)
├── ScoreService (Points and progression)
├── AudioService (Sound effects and music)
└── InputService (Keyboard/touch controls)
```

## 3. Core Features Specification

### 3.1 Game Map System

#### Map Structure

```typescript
interface MapCell {
  type: "wall" | "path" | "pellet" | "powerPellet" | "empty";
  position: Vector3;
  occupied: boolean;
  connections: Direction[];
}

interface GameMap {
  width: number;
  height: number;
  cells: MapCell[][];
  spawnPoints: {
    pacman: Vector3;
    ghosts: Vector3[];
  };
}
```

#### 3D Map Generation Pseudocode

```
FUNCTION generateMap(mapData):
  FOR each cell in mapData:
    position = new Vector3(x * CELL_SIZE, 0, z * CELL_SIZE)

    SWITCH cell.type:
      CASE 'wall':
        geometry = new BoxGeometry(CELL_SIZE, WALL_HEIGHT, CELL_SIZE)
        material = new MeshPhongMaterial({color: 0x0000FF})
        mesh = new Mesh(geometry, material)
        mesh.position.copy(position)
        scene.add(mesh)

      CASE 'pellet':
        geometry = new SphereGeometry(PELLET_RADIUS)
        material = new MeshBasicMaterial({color: 0xFFFF00})
        pellet = new Mesh(geometry, material)
        pellet.position.copy(position)
        pellet.userData = {type: 'pellet', points: 10}
        scene.add(pellet)

      CASE 'powerPellet':
        geometry = new SphereGeometry(POWER_PELLET_RADIUS)
        material = new MeshBasicMaterial({color: 0xFF0000})
        powerPellet = new Mesh(geometry, material)
        powerPellet.position.copy(position)
        powerPellet.userData = {type: 'powerPellet', points: 50}
        addPulsingAnimation(powerPellet)
        scene.add(powerPellet)
```

### 3.2 Pacman Player System

#### Player State

```typescript
interface PacmanState {
  position: Vector3;
  direction: Direction;
  nextDirection: Direction;
  speed: number;
  isAlive: boolean;
  isPoweredUp: boolean;
  powerUpTimer: number;
  lives: number;
}
```

#### Movement and Animation Pseudocode

```
FUNCTION updatePacman(deltaTime):
  // Handle input
  IF inputService.isPressed('ArrowUp'):
    player.nextDirection = Direction.UP
  ELIF inputService.isPressed('ArrowDown'):
    player.nextDirection = Direction.DOWN
  // ... other directions

  // Check if direction change is valid
  nextPosition = player.position + getDirectionVector(player.nextDirection)
  IF isValidMove(nextPosition):
    player.direction = player.nextDirection

  // Move player
  moveVector = getDirectionVector(player.direction) * player.speed * deltaTime
  newPosition = player.position + moveVector

  IF isValidMove(newPosition):
    player.position = newPosition
    pacmanMesh.position.copy(player.position)

    // Animate mouth opening/closing
    animatePacmanMouth(deltaTime)

    // Rotate to face movement direction
    pacmanMesh.lookAt(player.position + getDirectionVector(player.direction))

FUNCTION animatePacmanMouth(deltaTime):
  mouthOpenAngle += MOUTH_SPEED * deltaTime
  IF mouthOpenAngle > MAX_MOUTH_ANGLE:
    mouthOpenAngle = 0

  // Update geometry or shader for mouth animation
  updatePacmanGeometry(mouthOpenAngle)
```

#### Collision Detection

```
FUNCTION checkCollisions():
  // Check pellet collection
  pellets = scene.children.filter(obj => obj.userData.type === 'pellet')
  FOR each pellet in pellets:
    IF distance(player.position, pellet.position) < COLLECTION_RADIUS:
      collectPellet(pellet)

  // Check power pellet collection
  powerPellets = scene.children.filter(obj => obj.userData.type === 'powerPellet')
  FOR each powerPellet in powerPellets:
    IF distance(player.position, powerPellet.position) < COLLECTION_RADIUS:
      collectPowerPellet(powerPellet)

  // Check ghost collision
  FOR each ghost in ghosts:
    IF distance(player.position, ghost.position) < COLLISION_RADIUS:
      IF player.isPoweredUp:
        eatGhost(ghost)
      ELSE:
        playerDeath()
```

### 3.3 Ghost AI System

#### Ghost States

```typescript
enum GhostMode {
  SCATTER = "scatter",
  CHASE = "chase",
  FRIGHTENED = "frightened",
  EATEN = "eaten",
}

interface GhostState {
  position: Vector3;
  direction: Direction;
  mode: GhostMode;
  target: Vector3;
  speed: number;
  color: number;
  isAlive: boolean;
  modeTimer: number;
}
```

#### Ghost AI Pseudocode

```
FUNCTION updateGhost(ghost, deltaTime):
  // Update mode timer
  ghost.modeTimer -= deltaTime

  // Switch modes based on timer and game state
  SWITCH ghost.mode:
    CASE SCATTER:
      IF ghost.modeTimer <= 0:
        ghost.mode = CHASE
        ghost.modeTimer = CHASE_DURATION
      ghost.target = getScatterTarget(ghost)

    CASE CHASE:
      IF ghost.modeTimer <= 0:
        ghost.mode = SCATTER
        ghost.modeTimer = SCATTER_DURATION
      ghost.target = getChaseTarget(ghost, player.position)

    CASE FRIGHTENED:
      IF ghost.modeTimer <= 0:
        ghost.mode = SCATTER
        ghost.modeTimer = SCATTER_DURATION
      ghost.target = getRandomTarget()

    CASE EATEN:
      ghost.target = GHOST_HOME_POSITION
      IF distance(ghost.position, GHOST_HOME_POSITION) < 1:
        ghost.mode = SCATTER
        ghost.isAlive = true

  // Move towards target
  direction = getOptimalDirection(ghost.position, ghost.target)
  moveVector = direction * ghost.speed * deltaTime
  ghost.position += moveVector

  // Update visual representation
  ghostMesh.position.copy(ghost.position)
  updateGhostAnimation(ghost, deltaTime)

FUNCTION getOptimalDirection(currentPos, targetPos):
  // A* pathfinding or simple direction selection
  possibleDirections = getValidDirections(currentPos)
  bestDirection = null
  shortestDistance = Infinity

  FOR each direction in possibleDirections:
    testPos = currentPos + getDirectionVector(direction)
    distance = distance(testPos, targetPos)
    IF distance < shortestDistance:
      shortestDistance = distance
      bestDirection = direction

  RETURN bestDirection
```

### 3.4 Power-Up System

#### Power-Up Types

```typescript
interface PowerUp {
  type: "invincibility" | "speedBoost" | "doublePoints" | "extraLife";
  duration: number;
  effect: () => void;
  cleanup: () => void;
}
```

#### Power-Up Logic

```
FUNCTION collectPowerPellet(pellet):
  scene.remove(pellet)
  scoreService.addPoints(pellet.userData.points)

  // Activate power-up
  player.isPoweredUp = true
  player.powerUpTimer = POWER_UP_DURATION

  // Make ghosts frightened
  FOR each ghost in ghosts:
    IF ghost.mode !== EATEN:
      ghost.mode = FRIGHTENED
      ghost.modeTimer = POWER_UP_DURATION
      ghost.speed *= 0.5
      updateGhostMaterial(ghost, FRIGHTENED_COLOR)

FUNCTION updatePowerUps(deltaTime):
  IF player.isPoweredUp:
    player.powerUpTimer -= deltaTime
    IF player.powerUpTimer <= 0:
      player.isPoweredUp = false

      // Reset ghosts
      FOR each ghost in ghosts:
        IF ghost.mode === FRIGHTENED:
          ghost.mode = SCATTER
          ghost.speed /= 0.5
          resetGhostMaterial(ghost)
```

### 3.5 UI Overlay System

#### HUD Component Structure

```typescript
@Component({
  selector: 'game-ui',
  template: `
    <div class="game-hud">
      <div class="score-panel">
        <div class="score">Score: {{score$ | async}}</div>
        <div class="lives">Lives: {{lives$ | async}}</div>
        <div class="level">Level: {{level$ | async}}</div>
      </div>

      <div class="power-up-indicator" *ngIf="isPoweredUp$ | async">
        <div class="power-timer" [style.width.%]="powerUpPercentage$ | async"></div>
      </div>

      <div class="mini-map" *ngIf="showMiniMap">
        <canvas #miniMapCanvas></canvas>
      </div>

      <div class="game-messages">
        <div *ngFor="let message of messages$ | async"
             class="message {{message.type}}">
          {{message.text}}
        </div>
      </div>
    </div>
  `
})
```

#### Score System

```
FUNCTION updateScore(points, multiplier = 1):
  totalPoints = points * multiplier
  currentScore += totalPoints

  // Show floating score text
  showFloatingText(player.position, '+' + totalPoints)

  // Check for extra life
  IF currentScore >= nextExtraLifeScore:
    player.lives++
    nextExtraLifeScore += EXTRA_LIFE_INTERVAL
    showMessage('Extra Life!', 'success')

  // Update high score
  IF currentScore > highScore:
    highScore = currentScore
    saveHighScore()
```

### 3.6 Controls System

#### Input Handling

```typescript
@Injectable()
export class InputService {
  private keys: Set<string> = new Set();
  private touchStartPos: Vector2 | null = null;

  constructor() {
    this.setupKeyboardListeners();
    this.setupTouchListeners();
  }

  isPressed(key: string): boolean {
    return this.keys.has(key);
  }

  private setupKeyboardListeners(): void {
    document.addEventListener("keydown", (e) => {
      this.keys.add(e.code);
      this.handleSpecialKeys(e.code);
    });

    document.addEventListener("keyup", (e) => {
      this.keys.delete(e.code);
    });
  }

  private handleSpecialKeys(key: string): void {
    switch (key) {
      case "Space":
        this.gameStateService.togglePause();
        break;
      case "KeyR":
        this.gameStateService.restart();
        break;
    }
  }
}
```

#### Touch Controls Pseudocode

```
FUNCTION handleTouchInput(touchEvent):
  SWITCH touchEvent.type:
    CASE 'touchstart':
      touchStartPos = new Vector2(touchEvent.x, touchEvent.y)

    CASE 'touchend':
      IF touchStartPos:
        touchEndPos = new Vector2(touchEvent.x, touchEvent.y)
        swipeVector = touchEndPos - touchStartPos

        IF swipeVector.length() > MIN_SWIPE_DISTANCE:
          direction = getSwipeDirection(swipeVector)
          player.nextDirection = direction

        touchStartPos = null
```

## 4. Animation System

### 4.1 Pacman Animations

```
FUNCTION createPacmanGeometry():
  // Create sphere with mouth cutout
  geometry = new SphereGeometry(PACMAN_RADIUS, 32, 32, 0, Math.PI * 2, 0, Math.PI)

  // Add mouth animation capability
  geometry.morphTargets = [
    createMouthGeometry(0),     // Closed
    createMouthGeometry(PI/4),  // Half open
    createMouthGeometry(PI/2)   // Fully open
  ]

  RETURN geometry

FUNCTION animatePacmanMouth(time):
  // Create chomping animation
  mouthPhase = (Math.sin(time * CHOMP_SPEED) + 1) / 2
  geometry.morphTargetInfluences[0] = 1 - mouthPhase
  geometry.morphTargetInfluences[1] = mouthPhase
```

### 4.2 Ghost Animations

```
FUNCTION updateGhostAnimation(ghost, deltaTime):
  // Floating animation
  floatOffset = Math.sin(time * FLOAT_SPEED) * FLOAT_AMPLITUDE
  ghost.mesh.position.y = ghost.baseY + floatOffset

  // Color pulsing when frightened
  IF ghost.mode === FRIGHTENED:
    pulseIntensity = (Math.sin(time * PULSE_SPEED) + 1) / 2
    ghost.material.color.setRGB(pulseIntensity, pulseIntensity, 1)

  // Squash and stretch during movement
  moveSpeed = ghost.velocity.length()
  scaleX = 1 + (moveSpeed * STRETCH_FACTOR)
  scaleY = 1 - (moveSpeed * SQUASH_FACTOR)
  ghost.mesh.scale.set(scaleX, scaleY, 1)
```

## 5. Game State Management

### State Flow

```
ENUM GameState {
  MENU,
  PLAYING,
  PAUSED,
  GAME_OVER,
  LEVEL_COMPLETE
}

FUNCTION updateGameState(newState):
  previousState = currentState
  currentState = newState

  SWITCH newState:
    CASE PLAYING:
      resumeGame()
      showHUD()

    CASE PAUSED:
      pauseGame()
      showPauseMenu()

    CASE GAME_OVER:
      stopGame()
      showGameOverScreen()
      saveHighScore()

    CASE LEVEL_COMPLETE:
      stopGame()
      showLevelCompleteScreen()
      prepareNextLevel()
```

### Level Progression

```
FUNCTION checkLevelComplete():
  remainingPellets = scene.children.filter(obj =>
    obj.userData.type === 'pellet' || obj.userData.type === 'powerPellet'
  ).length

  IF remainingPellets === 0:
    currentLevel++
    gameState = LEVEL_COMPLETE

    // Increase difficulty
    increaseDifficulty()

    // Load next level after delay
    setTimeout(() => {
      loadLevel(currentLevel)
      gameState = PLAYING
    }, LEVEL_TRANSITION_DELAY)

FUNCTION increaseDifficulty():
  // Increase ghost speed
  FOR each ghost in ghosts:
    ghost.speed *= SPEED_INCREASE_FACTOR

  // Reduce power-up duration
  POWER_UP_DURATION *= POWER_DURATION_DECREASE_FACTOR

  // Add more ghosts if applicable
  IF currentLevel % 3 === 0 AND ghosts.length < MAX_GHOSTS:
    addNewGhost()
```

## 6. Performance Optimization

### 6.1 Object Pooling

```
CLASS ObjectPool:
  FUNCTION constructor(createFunction, resetFunction):
    this.createFn = createFunction
    this.resetFn = resetFunction
    this.available = []
    this.inUse = []

  FUNCTION acquire():
    IF available.length > 0:
      obj = available.pop()
      inUse.push(obj)
      RETURN obj
    ELSE:
      obj = createFn()
      inUse.push(obj)
      RETURN obj

  FUNCTION release(obj):
    resetFn(obj)
    index = inUse.indexOf(obj)
    IF index >= 0:
      inUse.splice(index, 1)
      available.push(obj)
```

### 6.2 Culling and LOD

```
FUNCTION optimizeRendering():
  cameraFrustum = new Frustum()
  cameraFrustum.setFromProjectionMatrix(camera.projectionMatrix)

  FOR each object in scene.children:
    // Frustum culling
    IF NOT cameraFrustum.intersectsObject(object):
      object.visible = false
      CONTINUE

    // Distance-based LOD
    distance = camera.position.distanceTo(object.position)

    IF distance > FAR_DISTANCE:
      object.visible = false
    ELIF distance > MEDIUM_DISTANCE:
      object.material = lowDetailMaterial
    ELSE:
      object.material = highDetailMaterial
      object.visible = true
```

## 7. Audio System

### Audio Management

```
CLASS AudioService:
  FUNCTION playSound(soundName, volume = 1, loop = false):
    IF NOT audioEnabled:
      RETURN

    sound = audioLoader.load(soundName)
    sound.setVolume(volume * masterVolume)
    sound.setLoop(loop)
    sound.play()

  FUNCTION playBackgroundMusic(trackName):
    IF backgroundMusic:
      backgroundMusic.stop()

    backgroundMusic = audioLoader.load(trackName)
    backgroundMusic.setVolume(musicVolume)
    backgroundMusic.setLoop(true)
    backgroundMusic.play()
```

## 8. Testing Strategy

### Unit Tests

- GameStateService state transitions
- Collision detection algorithms
- Score calculation logic
- Ghost AI pathfinding

### Integration Tests

- Player-ghost interactions
- Power-up system functionality
- Level progression mechanics
- UI state synchronization

### Performance Tests

- Frame rate consistency
- Memory usage monitoring
- Asset loading optimization
- Mobile device compatibility

## 9. Development Phases

### Phase 1: Core Infrastructure

1. Set up Angular + Three.js integration
2. Create basic 3D scene and camera
3. Implement map generation system
4. Basic player movement and collision

### Phase 2: Game Mechanics

1. Ghost AI implementation
2. Pellet collection system
3. Power-up mechanics
4. Score and life management

### Phase 3: Polish and UX

1. Animations and visual effects
2. UI overlay completion
3. Audio system integration
4. Mobile controls and responsive design

### Phase 4: Optimization and Testing

1. Performance optimization
2. Cross-browser testing
3. Mobile device testing
4. Accessibility improvements
