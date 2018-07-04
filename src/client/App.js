import React, { Component } from 'react';
import './app.css';

class Square extends React.Component {
  render() {
    return (
      <button className={this.props.className} onClick={() => this.props.onClick()}>
        {this.props.value}
      </button>
    );
  }
}


class Board extends React.Component {  

  constructor(props) {
    super(props);
    this.state = {
       squares: Array(64).fill(''),
       squaresColor: Array(64).fill(''),
       squaresLegal: Array(64).fill(false),
       turn: 'white',
       phase: 'selectPiece',
       spaceSelected: -1,
       message: "",
       whiteMoved: Array(3).fill(false),
       blackMoved: Array(3).fill(false),
    };
    var i = 0;
    while (i < 8)
    {
        this.state.squaresColor[i] = 'white';
        i++;
    }
    while (i < 16)
    {
        this.state.squaresColor[i] = 'white';
        this.state.squares[i] = 'pawn';
        i++;
    }
    i = 48;
    while (i < 56)
    {
        this.state.squaresColor[i] = 'black';
        this.state.squares[i] = 'pawn';
        i++;
    }
    while (i < 64)
    {
        this.state.squaresColor[i] = 'black';
        i++;
    }
    this.state.squares[0] = 'rook';
    this.state.squares[1] = 'knight';
    this.state.squares[2] = 'bishop';
    this.state.squares[3] = 'king';
    this.state.squares[4] = 'queen';
    this.state.squares[5] = 'bishop';
    this.state.squares[6] = 'knight';
    this.state.squares[7] = 'rook';
    this.state.squares[56] = 'rook';
    this.state.squares[57] = 'knight';
    this.state.squares[58] = 'bishop';
    this.state.squares[59] = 'king';
    this.state.squares[60] = 'queen';
    this.state.squares[61] = 'bishop';
    this.state.squares[62] = 'knight';
    this.state.squares[63] = 'rook';
  }

  save()
  {
  	fetch('/api/save',
  	{
  		method: 'POST',
  		body: JSON.stringify(this.state),
  		headers: {
  			"Content-Type": "application/json"
  		}
  	})
  }
  
  inverse(color)
  {
  	if (color == 'white')
  	{
  		return 'black';
  	}
  	return 'white';
  }

  calcCheck(i, color)
  {
  	    var j = i+1;
  	    while (true)
  	    {
  	        if (j%8 == 0)
  	        {
  	        	break;
  	        }
  	        if (this.state.squaresColor[j] == '')
  	        {
  	        }
  	      	else if (this.state.squaresColor[j] == color)
  	        {
  	        	break;
  	        }
  	        else
  	        {
  	        	if (this.state.squares[j] == 'rook' || this.state.squares[j] == 'queen')
  	        	{
  	        		return true
  	        	}
  	        	break;
  	        }
  	        j++;
  	    }
  	    j = i-1;
  	    while (true)
  	    {
  	        if (j%8 == 7)
  	        {
  	        	break;
  	        }
  	        if (this.state.squaresColor[j] == '')
  	        {
  	        }
  	      	else if (this.state.squaresColor[j] == color)
  	        {
  	        	break;
  	        }
  	        else
  	        {
  	        	if (this.state.squares[j] == 'rook' || this.state.squares[j] == 'queen')
  	        	{
  	        		return true
  	        	}
  	        	break;
  	        }
  	        j--;
  	    }
  	    j = i+8;
  	    while (true)
  	    {
  	        if (j > 63)
  	        {
  	        	break;
  	        }
  	        if (this.state.squaresColor[j] == '')
  	        {
  	        }
  	      	else if (this.state.squaresColor[j] == color)
  	        {
  	        	break;
  	        }
  	        else
  	        {
  	        	if (this.state.squares[j] == 'rook' || this.state.squares[j] == 'queen')
  	        	{
  	        		return true
  	        	}
  	        	break;
  	        }
  	        j+=8;
  	    }
  	    j = i-8;
  	    while (true)
  	    {
  	        if (j<0)
  	        {
  	        	break;
  	        }
  	        if (this.state.squaresColor[j] == '')
  	        {
  	        }
  	      	else if (this.state.squaresColor[j] == color)
  	        {
  	        	break;
  	        }
  	        else
  	        {
  	        	if (this.state.squares[j] == 'rook' || this.state.squares[j] == 'queen')
  	        	{
  	        		return true
  	        	}
  	        	break;
  	        }
  	        j-=8;
  	    }  		
  	    if (i%8 > 0 && i >= 16)
  		{
  			if (this.state.squaresColor[i-17] == inverse(color))
  			{
  	        	if (this.state.squares[i-17] == 'knight')
  	        	{
  	        		return true
  	        	}
  			}
  		}
  		if (i%8 < 7 && i >= 16)
  		{
  			if (this.state.squaresColor[i-15] == inverse(color))
  			{
  	        	if (this.state.squares[i-15] == 'knight')
  	        	{
  	        		return true
  	        	}
  			}
  		}
  		if (i%8 > 1 && i >= 8)
  		{
  			if (this.state.squaresColor[i-10] == inverse(color))
  			{
  	        	if (this.state.squares[i-10] == 'knight')
  	        	{
  	        		return true
  	        	}
  			}
  		}
  		if (i%8 < 6 && i >= 8)
  		{
  			if (this.state.squaresColor[i-6] == inverse(color))
  			{
  	        	if (this.state.squares[i-6] == 'knight')
  	        	{
  	        		return true
  	        	}
  			}
  		}
  		if (i%8 > 0 && i <= 47)
  		{
  			if (this.state.squaresColor[i+15] == inverse(color))
  			{
  	        	if (this.state.squares[i+15] == 'knight')
  	        	{
  	        		return true
  	        	}
  			}
  		}
  		if (i%8 < 7 && i <= 47)
  		{
  			if (this.state.squaresColor[i+17] == inverse(color))
  			{
  	        	if (this.state.squares[i+17] == 'knight')
  	        	{
  	        		return true
  	        	}
  			}
  		}
  		if (i%8 > 1 && i <= 55)
  		{
  			if (this.state.squaresColor[i+6] == inverse(color))
  			{
  	        	if (this.state.squares[i+6] == 'knight')
  	        	{
  	        		return true
  	        	}
  			}
  		}
  		if (i%8 < 6 && i <= 55)
  		{
  			if (this.state.squaresColor[i+10] == inverse(color))
  			{
  	        	if (this.state.squares[i+10] == 'knight')
  	        	{
  	        		return true
  	        	}
  			}
  		}
  	    var j = i+9;
  	    while (true)
  	    {
  	        if (j%8 == 0 || j > 63)
  	        {
  	        	break;
  	        }
  	        if (this.state.squaresColor[j] == '')
  	        {
  	        }
  	      	else if (this.state.squaresColor[j] == color)
  	        {
  	        	break;
  	        }
  	        else
  	        {
  	        	if (this.state.squares[j] == 'bishop' || this.state.squares[j] == 'queen')
  	        	{
  	        		return true
  	        	}
  	        	break;
  	        }
  	        j+=9;
  	    }
  	    j = i+7;
  	    while (true)
  	    {
  	        if (j%8 == 7 || j > 63 )
  	        {
  	        	break;
  	        }
  	        if (this.state.squaresColor[j] == '')
  	        {
  	        }
  	      	else if (this.state.squaresColor[j] == color)
  	        {
  	        	break;
  	        }
  	        else
  	        {
  	        	if (this.state.squares[j] == 'bishop' || this.state.squares[j] == 'queen')
  	        	{
  	        		return true
  	        	}
  	        	break;
  	        }
  	        j+=7;
  	    }
  	    j = i-7;
  	    while (true)
  	    {
  	        if (j%8 == 0 || j < 0)
  	        {
  	        	break;
  	        }
  	        if (this.state.squaresColor[j] == '')
  	        {
  	        }
  	      	else if (this.state.squaresColor[j] == color)
  	        {
  	        	break;
  	        }
  	        else
  	        {
  	        	if (this.state.squares[j] == 'bishop' || this.state.squares[j] == 'queen')
  	        	{
  	        		return true
  	        	}
  	        	break;
  	        }
  	        j-=7;
  	    }
  	    j = i-9;
  	    while (true)
  	    {
  	        if (j%8 == 7 || j<0)
  	        {
  	        	break;
  	        }
  	        if (this.state.squaresColor[j] == '')
  	        {
  	        }
  	      	else if (this.state.squaresColor[j] == color)
  	        {
  	        	break;
  	        }
  	        else
  	        {
  	        	if (this.state.squares[j] == 'bishop' || this.state.squares[j] == 'queen')
  	        	{
  	        		return true
  	        	}
  	        	break;
  	        }
  	        j-=9;
  	    }
  		if (i < 56 && this.state.squaresColor[i+8] == this.state.squaresColor[i])
  		{
  			if (this.state.squaresColor[i+8] == inverse(color))
  			{
  	        	if (this.state.squares[i+8] == 'king')
  	        	{
  	        		return true
  	        	}
  			}
  		}
  		if (i > 7 && this.state.squaresColor[i-8] != this.state.squaresColor[i])
  		{
  			if (this.state.squaresColor[i-8] == inverse(color))
  			{
  	        	if (this.state.squares[i-8] == 'king')
  	        	{
  	        		return true
  	        	}
  			}
  		}
  		if (i < 56 && i%8 > 0 && this.state.squaresColor[i+7] != this.state.squaresColor[i])
  		{
  			if (this.state.squaresColor[i+7] == inverse(color))
  			{
  	        	if (this.state.squares[i+7] == 'king')
  	        	{
  	        		return true
  	        	}
  			}
  		}
  		if (i < 56 && i%8 < 7 && this.state.squaresColor[i+9] != this.state.squaresColor[i])
  		{
  			if (this.state.squaresColor[i+9] == inverse(color))
  			{
  	        	if (this.state.squares[i+9] == 'king')
  	        	{
  	        		return true
  	        	}
  			}
  		}
  		if (i > 7 && i%8 > 0 && this.state.squaresColor[i-9] != this.state.squaresColor[i])
  		{
  			if (this.state.squaresColor[i-9] == inverse(color))
  			{
  	        	if (this.state.squares[i-9] == 'king')
  	        	{
  	        		return true
  	        	}
  			}
  		}
  		if (i > 7 && i%8 < 7 && this.state.squaresColor[i-7] != this.state.squaresColor[i])
  		{
  			if (this.state.squaresColor[i-7] == inverse(color))
  			{
  	        	if (this.state.squares[i-7] == 'king')
  	        	{
  	        		return true
  	        	}
  			}
  		}
  		if (i%8 > 0 && this.state.squaresColor[i-1] != this.state.squaresColor[i])
  		{
  			if (this.state.squaresColor[i-1] == inverse(color))
  			{
  	        	if (this.state.squares[i-1] == 'king')
  	        	{
  	        		return true
  	        	}
  			}
  		}
  		if (i%8 < 7 && this.state.squaresColor[i+1] != this.state.squaresColor[i])
  		{
  			if (this.state.squaresColor[i+1] == inverse(color))
  			{
  	        	if (this.state.squares[i+1] == 'king')
  	        	{
  	        		return true
  	        	}
  			}
  		}
		if (color == 'white')
		{
			if (i < 56)
			{
				if (i % 8 > 0 && this.state.squares[i+7] == 'pawn' && this.state.squaresColor[i+7] == 'black')
				{
					return true;
				}
				if (i % 8 < 7 && this.state.squares[i+9] == 'pawn' && this.state.squaresColor[i+9] == 'black')
				{
					return true;
				}
			}
		}
		else
		{
			if (i > 7)
			{
				if (i % 8 > 0 && this.state.squares[i-9] == 'pawn' && this.state.squaresColor[i-9] == 'white')
				{
					return true;
				}
				if (i % 8 < 7 && this.state.squares[i-7] == 'pawn' && this.state.squaresColor[i-7] == 'white')
				{
					return true;
				}
			}
		}
  	
  }
  
  load()
  {
  	fetch('/api/load')
  	  .then(res => res.json())
  	  .then(data => {
  	  		console.log("hello");
  	  		console.log(JSON.stringify(data));
   			this.setState({whiteMoved: data.whiteMoved, blackMoved: data.blackMoved, phase: data.phase, squares: data.squares, squaresColor: data.squaresColor, squaresLegal: data.squaresLegal, turn: data.turn, spaceSelected: data.spaceSelected});
  	  })
  }
  
  setStarting()
  {    
	var squares = Array(64).fill('');
    var squaresColor = Array(64).fill('');
    var squaresLegal = Array(64).fill(false);
    var whiteMoved = Array(3).fill(false);
    var blackMoved = Array(3).fill(false);
    var turn = 'white';
    var phase = 'selectPiece';
    var spaceSelected = -1;
    var i = 0;
    fetch('/api/getUsername', {
    	method: 'POST',
    	body: JSON.stringify({word: "text"}),
    	headers: {
    		"Content-Type": "application/json"
    	}
    })
      .then(res => res.json())
      .then(user => {
      	this.setState({ username: user.username});
      })
    while (i < 8)
    {
        squaresColor[i] = 'white';
        i++;
    }
    while (i < 16)
    {
        squaresColor[i] = 'white';
        squares[i] = 'pawn';
        i++;
    }
    i = 48;
    while (i < 56)
    {
        squaresColor[i] = 'black';
        squares[i] = 'pawn';
        i++;
    }
    while (i < 64)
    {
        squaresColor[i] = 'black';
        i++;
    }
    squares[0] = 'rook';
    squares[1] = 'knight';
    squares[2] = 'bishop';
    squares[3] = 'king';
    squares[4] = 'queen';
    squares[5] = 'bishop';
    squares[6] = 'knight';
    squares[7] = 'rook';
    squares[56] = 'rook';
    squares[57] = 'knight';
    squares[58] = 'bishop';
    squares[59] = 'king';
    squares[60] = 'queen';
    squares[61] = 'bishop';
    squares[62] = 'knight';
    squares[63] = 'rook';
   	this.setState({whiteMoved: whiteMoved, blackMoved: blackMoved, phase: phase, squares: squares, squaresColor: squaresColor, squaresLegal: squaresLegal, turn: turn, spaceSelected: spaceSelected});
}

  calcOptions(i)
  {
    var squaresLegal = this.state.squaresLegal.slice()
  	var move = false;
  	if (this.state.squares[i] == '')
  	{
  		return move
  	}
  	else if (this.state.squares[i] == 'rook')
  	{
  	    var j = i+1;
  	    while (true)
  	    {
  	        if (j%8 == 0)
  	        {
  	        	break;
  	        }
  	        if (this.state.squaresColor[j] == '')
  	        {
  	        	squaresLegal[j] = true;
  	        	move = true;
  	        }
  	      	else if (this.state.squaresColor[j] == this.state.squaresColor[i])
  	        {
  	        	break;
  	        }
  	        else
  	        {
  	        	squaresLegal[j] = true;
  	        	move = true;
  	        	break;
  	        }
  	        j++;
  	    }
  	    j = i-1;
  	    while (true)
  	    {
  	        if (j%8 == 7)
  	        {
  	        	break;
  	        }
  	        if (this.state.squaresColor[j] == '')
  	        {
  	        	squaresLegal[j] = true;
  	        	move = true;
  	        }
  	      	else if (this.state.squaresColor[j] == this.state.squaresColor[i])
  	        {
  	        	break;
  	        }
  	        else
  	        {
  	        	squaresLegal[j] = true;
  	        	move = true;
  	        	break;
  	        }
  	        j--;
  	    }
  	    j = i+8;
  	    while (true)
  	    {
  	        if (j > 63)
  	        {
  	        	break;
  	        }
  	        if (this.state.squaresColor[j] == '')
  	        {
  	        	squaresLegal[j] = true;
  	        	move = true;
  	        }
  	      	else if (this.state.squaresColor[j] == this.state.squaresColor[i])
  	        {
  	        	break;
  	        }
  	        else
  	        {
  	        	squaresLegal[j] = true;
  	        	move = true;
  	        	break;
  	        }
  	        j+=8;
  	    }
  	    j = i-8;
  	    while (true)
  	    {
  	        if (j<0)
  	        {
  	        	break;
  	        }
  	        if (this.state.squaresColor[j] == '')
  	        {
  	        	squaresLegal[j] = true;
  	        	move = true;
  	        }
  	      	else if (this.state.squaresColor[j] == this.state.squaresColor[i])
  	        {
  	        	break;
  	        }
  	        else
  	        {
  	        	squaresLegal[j] = true;
  	        	move = true;
  	        	break;
  	        }
  	        j-=8;
  	    }
  	}
  	else if (this.state.squares[i] == 'knight')
  	{
  		if (i%8 > 0 && i >= 16)
  		{
  			if (this.state.squaresColor[i-17] != this.state.squaresColor[i])
  			{
  				squaresLegal[i-17] = true;
  				move = true;
  			}
  		}
  		if (i%8 < 7 && i >= 16)
  		{
  			if (this.state.squaresColor[i-15] != this.state.squaresColor[i])
  			{
  				squaresLegal[i-15] = true;
  				move = true;
  			}
  		}
  		if (i%8 > 1 && i >= 8)
  		{
  			if (this.state.squaresColor[i-10] != this.state.squaresColor[i])
  			{
  				squaresLegal[i-10] = true;
  				move = true;
  			}
  		}
  		if (i%8 < 6 && i >= 8)
  		{
  			if (this.state.squaresColor[i-6] != this.state.squaresColor[i])
  			{
  				squaresLegal[i-6] = true;
  				move = true;
  			}
  		}
  		if (i%8 > 0 && i <= 47)
  		{
  			if (this.state.squaresColor[i+15] != this.state.squaresColor[i])
  			{
  				squaresLegal[i+15] = true;
  				move = true;
  			}
  		}
  		if (i%8 < 7 && i <= 47)
  		{
  			if (this.state.squaresColor[i+17] != this.state.squaresColor[i])
  			{
  				squaresLegal[i+17] = true;
  				move = true;
  			}
  		}
  		if (i%8 > 1 && i <= 55)
  		{
  			if (this.state.squaresColor[i+6] != this.state.squaresColor[i])
  			{
  				squaresLegal[i+6] = true;
  				move = true;
  			}
  		}
  		if (i%8 < 6 && i <= 55)
  		{
  			if (this.state.squaresColor[i+10] != this.state.squaresColor[i])
  			{
  				squaresLegal[i+10] = true;
  				move = true;
  			}
  		}
  	}
  	else if (this.state.squares[i] == 'bishop')
  	{
  	    var j = i+9;
  	    while (true)
  	    {
  	        if (j%8 == 0 || j > 63)
  	        {
  	        	break;
  	        }
  	        if (this.state.squaresColor[j] == '')
  	        {
  	        	squaresLegal[j] = true;
  	        	move = true;
  	        }
  	      	else if (this.state.squaresColor[j] == this.state.squaresColor[i])
  	        {
  	        	break;
  	        }
  	        else
  	        {
  	        	squaresLegal[j] = true;
  	        	move = true;
  	        	break;
  	        }
  	        j+=9;
  	    }
  	    j = i+7;
  	    while (true)
  	    {
  	        if (j%8 == 7 || j > 63 )
  	        {
  	        	break;
  	        }
  	        if (this.state.squaresColor[j] == '')
  	        {
  	        	squaresLegal[j] = true;
  	        	move = true;
  	        }
  	      	else if (this.state.squaresColor[j] == this.state.squaresColor[i])
  	        {
  	        	break;
  	        }
  	        else
  	        {
  	        	squaresLegal[j] = true;
  	        	move = true;
  	        	break;
  	        }
  	        j+=7;
  	    }
  	    j = i-7;
  	    while (true)
  	    {
  	        if (j%8 == 0 || j < 0)
  	        {
  	        	break;
  	        }
  	        if (this.state.squaresColor[j] == '')
  	        {
  	        	squaresLegal[j] = true;
  	        	move = true;
  	        }
  	      	else if (this.state.squaresColor[j] == this.state.squaresColor[i])
  	        {
  	        	break;
  	        }
  	        else
  	        {
  	        	squaresLegal[j] = true;
  	        	move = true;
  	        	break;
  	        }
  	        j-=7;
  	    }
  	    j = i-9;
  	    while (true)
  	    {
  	        if (j%8 == 7 || j<0)
  	        {
  	        	break;
  	        }
  	        if (this.state.squaresColor[j] == '')
  	        {
  	        	squaresLegal[j] = true;
  	        	move = true;
  	        }
  	      	else if (this.state.squaresColor[j] == this.state.squaresColor[i])
  	        {
  	        	break;
  	        }
  	        else
  	        {
  	        	squaresLegal[j] = true;
  	        	move = true;
  	        	break;
  	        }
  	        j-=9;
  	    }
  	}
  	else if (this.state.squares[i] == 'queen')
  	{
  	    var j = i+1;
  	    while (true)
  	    {
  	        if (j%8 == 0)
  	        {
  	        	break;
  	        }
  	        if (this.state.squaresColor[j] == '')
  	        {
  	        	squaresLegal[j] = true;
  	        	move = true;
  	        }
  	      	else if (this.state.squaresColor[j] == this.state.squaresColor[i])
  	        {
  	        	break;
  	        }
  	        else
  	        {
  	        	squaresLegal[j] = true;
  	        	move = true;
  	        	break;
  	        }
  	        j++;
  	    }
  	    j = i-1;
  	    while (true)
  	    {
  	        if (j%8 == 7)
  	        {
  	        	break;
  	        }
  	        if (this.state.squaresColor[j] == '')
  	        {
  	        	squaresLegal[j] = true;
  	        	move = true;
  	        }
  	      	else if (this.state.squaresColor[j] == this.state.squaresColor[i])
  	        {
  	        	break;
  	        }
  	        else
  	        {
  	        	squaresLegal[j] = true;
  	        	move = true;
  	        	break;
  	        }
  	        j--;
  	    }
  	    j = i+8;
  	    while (true)
  	    {
  	        if (j > 63)
  	        {
  	        	break;
  	        }
  	        if (this.state.squaresColor[j] == '')
  	        {
  	        	squaresLegal[j] = true;
  	        	move = true;
  	        }
  	      	else if (this.state.squaresColor[j] == this.state.squaresColor[i])
  	        {
  	        	break;
  	        }
  	        else
  	        {
  	        	squaresLegal[j] = true;
  	        	move = true;
  	        	break;
  	        }
  	        j+=8;
  	    }
  	    j = i-8;
  	    while (true)
  	    {
  	        if (j<0)
  	        {
  	        	break;
  	        }
  	        if (this.state.squaresColor[j] == '')
  	        {
  	        	squaresLegal[j] = true;
  	        	move = true;
  	        }
  	      	else if (this.state.squaresColor[j] == this.state.squaresColor[i])
  	        {
  	        	break;
  	        }
  	        else
  	        {
  	        	squaresLegal[j] = true;
  	        	move = true;
  	        	break;
  	        }
  	        j-=8;
  	    }
  	    var j = i+9;
  	    while (true)
  	    {
  	        if (j%8 == 0 || j > 63)
  	        {
  	        	break;
  	        }
  	        if (this.state.squaresColor[j] == '')
  	        {
  	        	squaresLegal[j] = true;
  	        	move = true;
  	        }
  	      	else if (this.state.squaresColor[j] == this.state.squaresColor[i])
  	        {
  	        	break;
  	        }
  	        else
  	        {
  	        	squaresLegal[j] = true;
  	        	move = true;
  	        	break;
  	        }
  	        j+=9;
  	    }
  	    j = i+7;
  	    while (true)
  	    {
  	        if (j%8 == 7 || j > 63 )
  	        {
  	        	break;
  	        }
  	        if (this.state.squaresColor[j] == '')
  	        {
  	        	squaresLegal[j] = true;
  	        	move = true;
  	        }
  	      	else if (this.state.squaresColor[j] == this.state.squaresColor[i])
  	        {
  	        	break;
  	        }
  	        else
  	        {
  	        	squaresLegal[j] = true;
  	        	move = true;
  	        	break;
  	        }
  	        j+=7;
  	    }
  	    j = i-7;
  	    while (true)
  	    {
  	        if (j%8 == 0 || j < 0)
  	        {
  	        	break;
  	        }
  	        if (this.state.squaresColor[j] == '')
  	        {
  	        	squaresLegal[j] = true;
  	        	move = true;
  	        }
  	      	else if (this.state.squaresColor[j] == this.state.squaresColor[i])
  	        {
  	        	break;
  	        }
  	        else
  	        {
  	        	squaresLegal[j] = true;
  	        	move = true;
  	        	break;
  	        }
  	        j-=7;
  	    }
  	    j = i-9;
  	    while (true)
  	    {
  	        if (j%8 == 7 || j<0)
  	        {
  	        	break;
  	        }
  	        if (this.state.squaresColor[j] == '')
  	        {
  	        	squaresLegal[j] = true;
  	        	move = true;
  	        }
  	      	else if (this.state.squaresColor[j] == this.state.squaresColor[i])
  	        {
  	        	break;
  	        }
  	        else
  	        {
  	        	squaresLegal[j] = true;
  	        	move = true;
  	        	break;
  	        }
  	        j-=9;
  	    }
  	}
  	else if (this.state.squares[i] == 'king')
  	{
  		if (i < 56 && this.state.squaresColor[i+8] != this.state.squaresColor[i])
  		{
  			squaresLegal[i+8] = true;
  			move = true;
  		}
  		if (i > 7 && this.state.squaresColor[i-8] != this.state.squaresColor[i])
  		{
  			squaresLegal[i-8] = true;
  			move = true;
  		}
  		if (i < 56 && i%8 > 0 && this.state.squaresColor[i+7] != this.state.squaresColor[i])
  		{
  			squaresLegal[i+7] = true;
  			move = true;
  		}
  		if (i < 56 && i%8 < 7 && this.state.squaresColor[i+9] != this.state.squaresColor[i])
  		{
  			squaresLegal[i+9] = true;
  			move = true;
  		}
  		if (i > 7 && i%8 > 0 && this.state.squaresColor[i-9] != this.state.squaresColor[i])
  		{
  			squaresLegal[i-9] = true;
  			move = true;
  		}
  		if (i > 7 && i%8 < 7 && this.state.squaresColor[i-7] != this.state.squaresColor[i])
  		{
  			squaresLegal[i-7] = true;
  			move = true;
  		}
  		if (i%8 > 0 && this.state.squaresColor[i-1] != this.state.squaresColor[i])
  		{
  			squaresLegal[i-1] = true;
  			move = true;
  		}
  		if (i%8 < 7 && this.state.squaresColor[i+1] != this.state.squaresColor[i])
  		{
  			squaresLegal[i+1] = true;
  			move = true;
  		}
  		if (this.state.squaresColor[i] == 'white')
  		{
  			if (i == 3)
  			{
  				if (this.state.squares[0] == 'rook' && this.state.squares[1] == '' && this.state.squares[2] == '' && this.state.squaresColor[0] == 'white')
  				{
  					squaresLegal[0] = true;
  				}
  				if (this.state.squares[7] == 'rook' && this.state.squares[6] == '' && this.state.squares[5] == '' && this.state.squares[4] == '' && this.state.squaresColor[7] == 'white')
  				{
  					squaresLegal[7] = true;
  				}
  			}
  		}
  		if (this.state.squaresColor[i] == 'black')
  		{
  			if (i == 59)
  			{
  				if (this.state.squares[56] == 'rook' && this.state.squares[57] == '' && this.state.squares[58] == '' && this.state.squaresColor[56] == 'black')
  				{
  					squaresLegal[56] = true;
  				}
  				if (this.state.squares[63] == 'rook' && this.state.squares[62] == '' && this.state.squares[61] == '' && this.state.squares[60] == '' && this.state.squaresColor[63] == 'black')
  				{
  					squaresLegal[63] = true;
  				}
  			}
  		}
  	}
  	else if (this.state.squares[i] == 'pawn')
  	{
  		if (this.state.squaresColor[i] == 'white')
  		{
  			if (this.state.squaresColor[i+8] == '')
  			{
  				squaresLegal[i+8] = true;
  				move = true;
  				if (i < 16 && this.state.squaresColor[i+16] == '')
  				{
  					squaresLegal[i+16] = true;
  					move = true;
  				}
  			}
  			if (i%8 > 0 && this.state.squaresColor[i+7] == 'black')
  			{
  				squaresLegal[i+7] = true;
  				move = true;
  			}
  			if (i%8 < 7 && this.state.squaresColor[i+9] == 'black')
  			{
  					squaresLegal[i+9] = true;
  					move = true
  				}
  		}
  		else
  		{
  			if (i <= 7)
  			{
  				var squares = this.state.squares.slice();
  				squares[i] = 'queen';
  				this.setState({squares: squares});
  				return this.calcOptions(i);
  			}
  			else
  			{
  				if (this.state.squaresColor[i-8] == '')
  				{
  					squaresLegal[i-8] = true;
  					move = true;
  					if (i >= 48 && this.state.squaresColor[i-16] == '')
  					{
  						squaresLegal[i-16] = true;
  						move = true;
  					}
  				}
  				if (i%8 > 0 && this.state.squaresColor[i-9] == 'white')
  				{
  					squaresLegal[i-9] = true;
  					move = true;
  				}
  				if (i%8 < 7 && this.state.squaresColor[i-7] == 'white')
  				{
  					squaresLegal[i-7] = true;
  					move = true
  				}
  			}
  		}
  	}
  	this.setState({squaresLegal: squaresLegal});
  	return move;
  }

  checkWinner() {
  	console.log("checking");
  	var i = 0;
  	var white = false;
  	var black = false;
  	while (i < 64)
  	{
  		if (this.state.squares[i] == 'king')
  		{
  			if (this.state.squaresColor[i] == 'white')
  			{
  				white = true;
  				console.log("w"+i);
  			}
  			else
  			{
  				black = true;
  				console.log("b"+i)
  			}
  		}
  		i++;
  	}
  	if (!white)
  	{
   		this.setStarting();
   		this.setState({message: "The winner of the previous game was: black"})
  	}
  	else if (!black)
  	{
   		this.setStarting();
   		this.setState({message: "The winner of the previous game was: white"})
  	}
  }

  handleClick(i) {
    //this.saveState();
    var squares = this.state.squares.slice();
    var squaresColor = this.state.squaresColor.slice();
    console.log(this.state.phase);
    if (this.state.phase == 'selectPiece')
    {
    	if (squaresColor[i] == this.state.turn)
    	{
    		if (this.calcOptions(i))
    		{
	    		this.setState({phase: 'selectSpot', spaceSelected: i, message: " "});
    		}
    		else
    		{
    			this.setState({message: "That piece has no legal moves"});
    		}
    	}
    	else
    	{
    		this.setState({message: "That is not one of your pieces"});
    	}
    }
    else if (this.state.phase == 'selectSpot')
    {
		var squaresLegal = this.state.squaresLegal.slice();
   		if (squaresLegal[i])
   		{
  
			if (i == 0 && this.state.spaceSelected == 3 && squares[3] == 'king')
   			{
   				squares[0] = '';
   				squaresColor[0] = ''
   				squares[1] = 'king';
   				squaresColor[1] = 'white';
   				squares[2] = 'rook';
   				squaresColor[2] = 'white';
   				squares[3] = '';
   				squaresColor[3] = '';
   			}
   			else if (i == 7 && this.state.spaceSelected == 3 && squares[3] == 'king')
   			{
   				squares[7] = '';
   				squaresColor[7] = ''
   				squares[6] = 'king';
   				squaresColor[6] = 'white';
   				squares[5] = 'rook';
   				squaresColor[5] = 'white';
   				squares[3] = '';
   				squaresColor[3] = '';
   			}
   			else if (i == 56 && this.state.spaceSelected == 59 && squares[59] == 'king')
   			{
   				squares[56] = '';
   				squaresColor[56] = ''
   				squares[57] = 'king';
   				squaresColor[57] = 'black';
   				squares[58] = 'rook';
   				squaresColor[58] = 'black';
   				squares[59] = '';
   				squaresColor[59] = '';
   			}
   			if (i == 63 && this.state.spaceSelected == 59 && squares[59] == 'king')
   			{
   				squares[63] = '';
   				squaresColor[63] = ''
   				squares[62] = 'king';
   				squaresColor[62] = 'black';
   				squares[61] = 'rook';
   				squaresColor[61] = 'black';
   				squares[59] = '';
   				squaresColor[59] = '';
   			}
   			else
   			{
   				squares[i] = squares[this.state.spaceSelected];
   				squaresColor[i] = squaresColor[this.state.spaceSelected];
   				squares[this.state.spaceSelected] = '';
   				squaresColor[this.state.spaceSelected] = '';
   			}
   			squaresLegal = Array(64).fill(false);
   			if (i > 55 && squares[i] == 'pawn' && squaresColor[i] == 'white')
   			{
   				squares[i] = 'queen';
   			}
   			if (i < 8 && squares[i] == 'pawn' && squaresColor[i] == 'black')
   			{
   				squares[i] = 'queen';
   			}
      			this.setState({phase: 'selectPiece', squares: squares, squaresColor: squaresColor, squaresLegal: squaresLegal}, function() {this.checkWinner()});
   			if (this.state.turn == 'white')
   			{
   				this.setState({turn: 'black'});
   			}
   			else
   			{
   				this.setState({turn: 'white'});
   			}/*
   			int i = 0;
   			while (i < 64)
   			{
   				if (this.state.squares[i] == 'king' && this.state.squaresColor[i] == this.state.turn)
   				{
   					if (calcCheck(i, this.state.turn))
   					{
   						this.setState(message: "You are in check");
   					}
   					break;
   				}
   				i++;
   			}*/

   		}
   		else
   		{
   			squaresLegal = Array(64).fill(false);
   			this.setState({message: "That is not a legal move", squaresLegal: squaresLegal, phase: 'selectPiece'})
   		}
    }
  }
  
  renderSquare(i) {
    var grid = "odd";
    if ((i + (i-i%8)/8)%2 == 0)
    {
    	grid = "even";
    }
    return <Square 
       value={this.state.squares[i]} 
	   onClick={() => this.handleClick(i)}
	   className={"square " + this.state.squaresLegal[i] + " " + this.state.squaresColor[i] + " " + grid}
	/>;
  }

  renderSave() {
    return <Square 
       value={"save"} 
	   onClick={() => this.save()}
	   className={"button"}
	/>;
  }

  renderLoad() {
    return <Square 
       value={"load"} 
	   onClick={() => this.load()}
	   className={"button"}
	/>;
  }

  renderMark() {
    return <Square 
       value={"mark"} 
	   onClick={() => this.setStarting()}
	   className={"button"}
	/>;
  }

  render() {
    const status = 'Next player: ';

    return (
      <div>
        <div className="status">{status + this.state.turn + this.state.username}</div>
        <div className="message">{this.state.message}</div>
        <div className="buttons">
        	{this.renderSave()}
        	{this.renderLoad()}
        	{this.renderMark()}
        </div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
          {this.renderSquare(6)}
          {this.renderSquare(7)}
        </div>
        <div className="board-row">
          {this.renderSquare(8)}
          {this.renderSquare(9)}
          {this.renderSquare(10)}
          {this.renderSquare(11)}
          {this.renderSquare(12)}
          {this.renderSquare(13)}
          {this.renderSquare(14)}
          {this.renderSquare(15)}
        </div>
        <div className="board-row">
          {this.renderSquare(16)}
          {this.renderSquare(17)}
          {this.renderSquare(18)}
          {this.renderSquare(19)}
          {this.renderSquare(20)}
          {this.renderSquare(21)}
          {this.renderSquare(22)}
          {this.renderSquare(23)}
        </div>
        <div className="board-row">
          {this.renderSquare(24)}
          {this.renderSquare(25)}
          {this.renderSquare(26)}
          {this.renderSquare(27)}
          {this.renderSquare(28)}
          {this.renderSquare(29)}
          {this.renderSquare(30)}
          {this.renderSquare(31)}
        </div>
        <div className="board-row">
          {this.renderSquare(32)}
          {this.renderSquare(33)}
          {this.renderSquare(34)}
          {this.renderSquare(35)}
          {this.renderSquare(36)}
          {this.renderSquare(37)}
          {this.renderSquare(38)}
          {this.renderSquare(39)}
        </div>
        <div className="board-row">
          {this.renderSquare(40)}
          {this.renderSquare(41)}
          {this.renderSquare(42)}
          {this.renderSquare(43)}
          {this.renderSquare(44)}
          {this.renderSquare(45)}
          {this.renderSquare(46)}
          {this.renderSquare(47)}
        </div>
        <div className="board-row">
          {this.renderSquare(48)}
          {this.renderSquare(49)}
          {this.renderSquare(50)}
          {this.renderSquare(51)}
          {this.renderSquare(52)}
          {this.renderSquare(53)}
          {this.renderSquare(54)}
          {this.renderSquare(55)}
        </div>
        <div className="board-row">
          {this.renderSquare(56)}
          {this.renderSquare(57)}
          {this.renderSquare(58)}
          {this.renderSquare(59)}
          {this.renderSquare(60)}
          {this.renderSquare(61)}
          {this.renderSquare(62)}
          {this.renderSquare(63)}
        </div>
      </div>
    );
  }
  
  /*saveState()
  {
  	fs.writeFile('/board_state.json', JSON.stringify(this.state));
  }*/
}

export default class Game extends React.Component {
  constructor(props) {
    super(props);
  }

    render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { username: null };
  }

  componentDidMount() {
    fetch('/api/getUsername')
      .then(res => res.json())
      .then(user => this.setState({ username: user.username }));
  }

  render() {
    return (
      <div>
        {this.state.username ? (
          <h1>Hello {this.state.username}</h1>
        ) : (
          <h1>Loading.. please wait!</h1>
        )}
      </div>
    );
  }
}
