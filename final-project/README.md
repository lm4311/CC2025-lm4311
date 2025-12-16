# A top-down driving game built with p5.js, p5.sound, and ml5.js HandPose, featuring a modular class-based architecture and optional gesture-based input via webcam.

## Resource Library
- p5.js — rendering & game loop
- p5.sound — music & sound effects
- ml5.js HandPose — real-time hand tracking
- JavaScript — class-based game architecture

## Architecture Overview

The game is structured using object-oriented design. Each gameplay element is encapsulated in its own class, enabling clear separation of concerns and easy extensibility.

### Core Classes

#### Road
- Manages vertical scrolling, lane positions, and road boundaries
- Generates and recycles lane stripes and center road blocks
- Provides lane helper methods (e.g. getLaneCenter())
- Acts as the spatial reference for all moving objects

#### Car
- Player-controlled vehicle
- Supports keyboard and gesture-based input
- Horizontal movement constrained to road bounds
- Uses lerp-based smoothing for gesture input
- Implements collision radius and vertical checkpoints

#### Item
- Unified class for all interactable objects
- Differentiated by kind:
  - charge — restores energy
  - garbage — activates bonus mode
  - rock — obstacle (game over)
- Handles vertical movement and collision logic

#### SceneryBuilding / SceneryTree
- Decorative side elements (non-collidable)
- Spawn outside road bounds
- Move at half road speed for parallax depth
- Recycled when offscreen using random regeneration helpers

## Gameplay Systems

### Spawning System
- Centralized spawnItems() helper
- Frame-based probability checks
- Lane-aware placement to avoid unfair spawns
- Weighted randomness for balancing risk and reward

### Collision System
- Radial distance checks for item collisions
- Combined horizontal overlap + vertical sampling for road blocks
- Collision effects handled based on item type

### Energy, Score & Bonus
- Energy drains over time (frame-rate independent)
- Score increases based on survival time
- Bonus mode:
  - Temporary score multiplier
  - Increased road speed
  - Timer-based duration

## Input System

### Keyboard Input
- A/D or Arrow keys for horizontal movement

### Gesture Input (HandPose)
- Index finger X-position mapped to car movement
- Camera mirroring compensated
- Lerp smoothing to reduce jitter
- Calibration logic on hand re-detection
- Pinch gesture abstracted via isPinching() helper (UI use)

## UI & Game State

Game flow controlled via simple states:
- mainMenu
- howToPlay
- gameOver

UI rendering separated into helpers:
- drawUI()
- drawMainMenu()
- drawHowToPlay()
- drawGameOver()

## Audio System
- Looping background music with execution gating
- Categorized sound effects for gameplay and UI
- One-shot triggers prevent overlap during state changes

