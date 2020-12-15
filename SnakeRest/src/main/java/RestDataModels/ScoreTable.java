package RestDataModels;

import javax.persistence.*;
import java.util.Objects;

@Entity
public class ScoreTable {
    private int scoreId;
    private String playerName;
    private int score;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ScoreID", nullable = false)
    public int getScoreId() {
        return scoreId;
    }

    public void setScoreId(int scoreId) {
        this.scoreId = scoreId;
    }

    @Basic
    @Column(name = "PlayerName", nullable = false, length = 2147483647)
    public String getPlayerName() {
        return playerName;
    }

    public void setPlayerName(String playerName) {
        this.playerName = playerName;
    }

    @Basic
    @Column(name = "Score", nullable = false)
    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ScoreTable that = (ScoreTable) o;
        return scoreId == that.scoreId && score == that.score && Objects.equals(playerName, that.playerName);
    }

    @Override
    public int hashCode() {
        return Objects.hash(scoreId, playerName, score);
    }
}
