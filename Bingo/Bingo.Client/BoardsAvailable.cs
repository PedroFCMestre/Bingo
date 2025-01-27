using Bingo.Client.Domain;

namespace Bingo.Client;

public class BoardsAvailable
{
    public List<Board> Boards { get; set; } = [];

    public BoardsAvailable()
    {
        Boards.Add(new Board(5, 5, 15)); //5x5 board with 15 numbers per column
        Boards.Add(new Board(4, 5, 15)); //4x5 board with 15 numbers per column
    }
}
