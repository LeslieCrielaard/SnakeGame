package ServiceInterfaces;

import RestDataModels.Scores;

import java.util.List;

public interface SnakeServiceInterface {
    void storeScores(String playerName,int Score);
    List<Scores> getHighestScores();
}
