﻿namespace Bingo.Client.Domain;

public class Game
{
    public Guid Id { get; set; } = new Guid();
    public GameStatus Status { get; set; } = GameStatus.NotStarted;
    public required Board Board { get; set; }
    public List<int> NumbersDrawn { get; set; } = [];

    public void StartGame(Board board)
    {
        if (Status != GameStatus.NotStarted)
        {
            throw new InvalidOperationException("Game is already in progress");
        }
        Board = board;
        Status = GameStatus.InProgress;
    }

    public void EndGame()
    {
        Status = GameStatus.NotStarted;
        //Board = null;
        NumbersDrawn.Clear();
    }

    public string DrawBall()
    {
        if(Status != GameStatus.InProgress)
        {
            throw new InvalidOperationException("Game is not in progress");
        }
        
        var number = 0;

        while (number == 0 || NumbersDrawn.Contains(number))
        {
            number = new Random().Next(1, Board.TotalNumbers + 1);
        }

        NumbersDrawn.Add(number);

        CheckIfGameIsCompleted();

        return GetBallLabel(number);
    }

    public string GetBallLabel(int number)
    {
        var column = (int)Math.Ceiling((decimal)number / Board.NumberRangePerColumn) - 1;
        return $"{Board.ColumnsLetters[column]}{number}";
    }

    private void CheckIfGameIsCompleted()
    {
        if (NumbersDrawn.Count == Board.TotalNumbers)
        {
            Status = GameStatus.Completed;
        }
    }
}
