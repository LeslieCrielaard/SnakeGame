package RestControllers;

import RestDataModels.Scores;
import ServiceInterfaces.SnakeServiceInterface;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;

@RestController
@CrossOrigin()
public class SnakeScoreController {

    @Resource(name = "SnakeService")
    private SnakeServiceInterface snakeService;


    public SnakeScoreController() {
    }
    @RequestMapping(path = "/getHighestScores", method = RequestMethod.GET)
    @ResponseBody
    public List<Scores> getHighestScores(){
        return snakeService.getHighestScores();
    }
    @RequestMapping(path = "/storeScore", method = RequestMethod.POST)
    @ResponseBody
    public void storeScore(String PlayerName, int Score){
        snakeService.storeScores(PlayerName,Score);
    }
}
