namespace Bingo.Client.Domain;

public class Board(int rows, int columns, int numberRangePerColumn)
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public int Rows { get; set; } = rows;
    public int Columns { get; set; } = columns;
    public int NumberRangePerColumn { get; set; } = numberRangePerColumn;
    public int TotalNumbers { get; set; } = columns * numberRangePerColumn;
    public List<char> ColumnsLetters { get; set; } = new List<char> { 'B', 'I', 'N', 'G', 'O' };
}
