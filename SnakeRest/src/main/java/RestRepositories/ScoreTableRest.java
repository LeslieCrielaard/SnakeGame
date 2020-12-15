package RestRepositories;

import RestDataModels.ScoreTable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.util.List;

public interface ScoreTableRest extends JpaRepository<ScoreTable,Integer> {
    @Transactional
    @Modifying
    @Query(value = "INSERT INTO ScoreTable(PlayerName,Score) VALUES(:PlayerName,:Score)", nativeQuery = true)
    void Store(@Param("PlayerName")String PlayerName,@Param("Score") int Score);


    @Query(value = "SELECT TOP 10 * FROM ScoreTable ORDER BY Score DESC ",nativeQuery = true)
    List<ScoreTable> getHighestScores();
}
