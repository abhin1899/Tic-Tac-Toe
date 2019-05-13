
    // Grid For TicTacToe..
    // 0 1 2
    // 3 4 5
    // 6 7 8
    // Represented By Array of 'numbers' type Board.


class TicTacToe { // Everything Inside A Class !.
    board: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0]; // Initialize board variable as an array of 'numbers' type.
    table: HTMLElement[]; //Initialize table variable as an array of 'HTMLElement' type.

    symbol: number = -1; //Initializing symbol varible to be a 'number' type with initial value '-1'.
    gameRunning: boolean = true; //Initializing gameRunning variable of 'boolean' type with initial value 'true'.

    constructor(t: HTMLElement[]) { // Constructor 
        this.table = t;
        this.board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    }

    // Reset function to reset the grid.
    Reset() {
        this.board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.gameRunning = true;
        for (let i = 0; i < 9; i++) {
            this.table[i].style.color = "white";
        }
    }

    // IsFull function to check whether the grid is full and to check draw condition.
    IsFull(): boolean {
        for (let i = 0; i < 9; i++) {
            if (this.board[i] == 0)
                return false;
            }
        return true;
    }

    ClickCell(x: number, y: number) { // ClickCell Function Called Everytime When A User Clicks A Cell.
        console.log(this.board);
        let p: number = 3 * (x - 1) + (y - 1); //Get The Board Index.
        if (!this.gameRunning) {
            alert("Game over");
        } else {
            if (this.board[p] == this.symbol) { // Protecting AI Move Not To Be Overridden.
                alert("Invalid!!");
            }
            else {
                if (this.board[p] == -this.symbol) { // Protecting User Move Not To Be Overriden.
                    alert("Invalid!!");
                }
                else {
                    this.table[p].style.color = "#25bfc4"; // setting color for user.
                    this.table[p].innerHTML = "X"; //setting 'X' for user.
                    this.board[p] = 1; // setting user move to the board array as 1.
                    if (this.win(this.board) == 1) { // checking for win condition by AI.
                        this.gameRunning = false; // If won make the game running state to false.
                        alert("You have won!");  // Not Possible. 
                    } else {
                        if (this.IsFull()) {
                            this.gameRunning = false; // Else Draw condition possible if all moves are complete.
                            alert("Draw match");
                        } else {
                            let v = this.minimax(-1, true); // call the minMax function to get the AI's move Index against the user in the board
                            this.board[v] = -1; // setting AI move to the board array as 1.
                            this.table[v].style.color = "#fac95f"; // setting color for AI.
                            this.table[v].innerHTML = "O"; // setting 'O' for user.
                            if (this.win(this.board) == -1) {
                                this.gameRunning = false; //checking for win condition by AI.
                                alert("You have lost!"); // User Has Lost.
                            } else {
                                if (this.IsFull()) {
                                    this.gameRunning = false; //Else Draw condition possible if all moves are complete.
                                    alert("Draw match");
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    win(board: number[]): number { // Checking all the win possibilities --> 8 Possibilities (0,1,2);(3,4,5);(6,7,8);(0,3,6);(1,4,7);(2,5,8);(0,4,8);(2,4,6);
        var b = board[1];
        if (board[0] == b && b == board[2] && b != 0) return b;
        b = board[4];
        if (board[3] == b && b == board[5] && b != 0) return b;
        b = board[7];
        if (board[6] == b && b == board[8] && b != 0) return b;
        b = board[3];
        if (board[0] == b && b == board[6] && b != 0) return b;
        b = board[4];
        if (board[1] == b && b == board[7] && b != 0) return b;
        b = board[5];
        if (board[2] == b && b == board[8] && b != 0) return b;
        b = board[4];
        if (board[0] == b && b == board[8] && b != 0) return b;
        if (board[2] == b && b == board[6] && b != 0) return b;
        return 0;
    }

    minimax(currentPlayer: number, root: boolean): number { //minimax Algorithm to compute the AI move against the user.
        let winner = this.win(this.board);
        if (winner != 0)
            if (currentPlayer == -1)
                return winner;
            else
                return -winner;

        //computing all the possible moves

        let possibleMoves: number[] = []; // Initializing new array 'possibleMoves' of 'number' type.
        for (let i = 0; i < 9; i++) {
            if (this.board[i] == 0)
                possibleMoves.push(i); // push all elements form board to 'possibleMoves' with a value 0. i.e All the free blocks in the grid
                                       // not attempted by user. 
        }
        let n: number = possibleMoves.length; // inintialize a variable 'n' and assign it with length of the 'possibleMoves' Array.
        if (n == 0)
            return 0;
        let which: number = -1; //Initialize 'which' to be a type of 'number', Here which stores the grid number of the AI move.
        let v: number = 100; // Initialize 'v' to be a type of 'number', Here v acts as INT_MAX.
        for (let j = 0; j < n; j++) { // compute for all possible moves.
            let move = possibleMoves[j]; 
            //play
            this.board[move] = currentPlayer; 
            var m = -this.minimax(-currentPlayer, false); //If the minimax function does not find a terminal state, it keeps recursively going level by level deeper into the game. 
                                                          //This recursion happens until it reaches a terminal state and returns a score one level up.
            this.board[move] = 0;
            if (m < v) {
                v = m;
                which = move; //storing the index.
            }
        }
        if (root) {
            console.log("root",which); // log the AI's board move index onto console..
            return (which)
        }
        else
            return (v)
    }
}


// Initializing onload Function.
window.onload = () => {
    let cell11: HTMLElement = <HTMLElement>document.getElementById("cell11");
    let cell12: HTMLElement = <HTMLElement>document.getElementById("cell12");
    let cell13: HTMLElement = <HTMLElement>document.getElementById("cell13");
    let cell21: HTMLElement = <HTMLElement>document.getElementById("cell21");
    let cell22: HTMLElement = <HTMLElement>document.getElementById("cell22");
    let cell23: HTMLElement = <HTMLElement>document.getElementById("cell23");
    let cell31: HTMLElement = <HTMLElement>document.getElementById("cell31");
    let cell32: HTMLElement = <HTMLElement>document.getElementById("cell32");
    let cell33: HTMLElement = <HTMLElement>document.getElementById("cell33");
    let reset: HTMLButtonElement = <HTMLButtonElement>document.getElementById("reset");

    // ttt instance of class TicTacToe.
    let ttt: TicTacToe = new TicTacToe([cell11, cell12, cell13, cell21, cell22, cell23, cell31, cell32, cell33]);

    // Defining.
    cell11.onclick = (e) => { ttt.ClickCell(1, 1); }
    cell12.onclick = (e) => { ttt.ClickCell(1, 2); }
    cell13.onclick = (e) => { ttt.ClickCell(1, 3); }
    cell21.onclick = (e) => { ttt.ClickCell(2, 1); }
    cell22.onclick = (e) => { ttt.ClickCell(2, 2); }
    cell23.onclick = (e) => { ttt.ClickCell(2, 3); }
    cell31.onclick = (e) => { ttt.ClickCell(3, 1); }
    cell32.onclick = (e) => { ttt.ClickCell(3, 2); }
    cell33.onclick = (e) => { ttt.ClickCell(3, 3); }
    reset.onclick = (e) => { ttt.Reset(); }
}
