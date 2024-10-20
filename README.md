# Simple Multiplayer Rating System

## Background

For free-for-all multiplayer games, a standard ELO system (1v1 only) does not work. This rating system attempts to be an easily-implementable system for multiplayer games wanting to use a rating system that reflects true skill. This can be used in any game that ranks players based on a single performance metric at the end of a match.

## High-level overview

Players start with a rating of 5,000 and can gain and lose points. You gain points for each opponent you place ahead of, and lose points for each opponent that places above you. In addition, you will gain or lose an additional number of points based on the difference between your rating and each of your opponents - this adjustment factor can be tuned depending on how heavily you want to rate skill difference. The rating system is a zero-sum game, meaning that all points gained minus all points lost will be 0 for each match.

This system is a simplified version of the VR system used in Mario Kart Wii. For more information, see here. https://wiki.tockdom.com/wiki/Player_Rating

## Example calculations

### Example 1

Imagine a scenario with 4 players, each with the same rating:
- 1st place: Player 1: 5,000 (+30)
- 2nd place: Player 2: 5,000 (+10)
- 3rd place: Player 3: 5,000 (-10)
- 4th place: Player 4: 5,000 (-30)

In this rating system, you gain 10 points for each opponent you beat and lose 10 for each that beats you. For the first place finisher, they beat 3 players and were beat by none, so they gain 3 * 10 = +30. For the second place finisher, they beat 2 players and were beat by 1, so their score is 2 * 10 - 10 = +10. For the third place finisher, they beat 1 player but lost to 2, so they would lose 10 points. The 4th place finisher would then lose 30. Note how because all players have the same rating, no scoring adjustment was applied, and the number of points gained overall are equal to the number of points lost overall.

### Example 2

In a second example, imagine the following placements with players of different skill ratings.
- 1st place: Player 1: 6,000 (+36)
- 2nd place: Player 2: 9,000 (-8)
- 3rd place: Player 3: 7,000 (-12)
- 4th place: Player 4: 5,000 (-16)

The adjustment formula is as follows:

`∑R * A / 1000`

Where R is the sum of rating difference between you and each opponent, and A is the adjustment factor used (default is 2).

In this example, since all players have different ratings, we need to calculate the difference in ratings to determine each player's adjustment. For player 1, they have 3k less than player 2, 1k less than player 3, and 1k more than player 4. So their adjustment is 3k + 1k - 1k = 3k * 2 / 1000 = 6. This means that player 1 will gain 6 more points than the normal 30, so they will get +36. For player 2, they have 3k less than player 1, 2k less than player 3 and 4k less than player 4. Their calculation is -3k - 2k - 4k = -9k * 2 / 1000 = -18. Normally they would get +10 for second, but due to their high rating, they will actually get 10 - 18 = -8. The higher your rating the higher you need to place to gain points! Using these same calculations, player 3 will have an adjustment of -2 (-12 total), and player 4 will have an adjustment of +14 (-16 total).
