package RestServices;

import RestDataModels.ScoreTable;
import RestDataModels.Scores;
import RestRepositories.ScoreTableRest;
import ServiceInterfaces.SnakeServiceInterface;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

public class SnakeService implements SnakeServiceInterface {
    @Resource(name = "scoreTableRest")
    private ScoreTableRest scoreTableRest;
    @Override
    public void storeScores(String playerName, int Score) {
        scoreTableRest.Store(playerName,Score);
    }

    @Override
    public List<Scores> getHighestScores() {
        List<Scores>convertedScores = new ArrayList<>();
    List<ScoreTable>scores = scoreTableRest.getHighestScores();
        for (ScoreTable score:scores) {
            convertedScores.add(new Scores(score.getPlayerName(),score.getScore()));
        }
        return convertedScores;
    }
}
