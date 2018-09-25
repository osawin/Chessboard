# Chessboard

Creates a HTML construct which enacts the rules of chess.
On your turn, first click on one of your pieces.
Legal squares to move into will be highlighted in blue.
Click on one of those to move that pieces, click on another square to return to the piece selection stage.
Once a piece moves, play continues to the other player's turn.
The game ends when one of the kings is taken, resetting the board to its base state.

The design of the chessboard and all functionality is stored in src/client/App.js
Saving/loading board states is handled by src/server/index.js
Configuration details are stored in webpack.config.js