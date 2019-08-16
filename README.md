## Objectives

**Game structure**
- Splash
- Turn
- Conclusion
- Advance (conditional)

ex:
GameState === null ?
	Splash
	: GameState.winner ?
		(GameState.winner === player ? Concusion(success) : Concusion(failure))
		: GameState === advance ?
			Advance
			: Turn

**Splash structure**
- User sees screen
- User clicks begin button
- Game state sets first player to begin at random
- User sees animation

**Turn structure**
- User sees current board state
- User selects a slot
- Game state updates
- User sees animation of token "falling" in slot

**Conclusion structure**
- If game state returns user as winner > Advance
- If game state returns CPU as winner, user sees conclusion screen with score and button to play again

**Advance structure**
- User sees animation
- Game state updates to include new parameters (not set yet - might be larger boards)