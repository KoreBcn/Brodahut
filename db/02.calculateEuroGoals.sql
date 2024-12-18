DELIMITER //

DROP PROCEDURE IF EXISTS CALCULATE_GOALS;

CREATE PROCEDURE CALCULATE_GOALS()

BEGIN

DECLARE done INTEGER DEFAULT FALSE;
DECLARE  v_updateid INTEGER DEFAULT 0;
DECLARE  v_gameweek INTEGER DEFAULT 1;
DECLARE  v_playerhome INTEGER DEFAULT 0;
DECLARE  v_playerhomepoints INTEGER DEFAULT 0;
DECLARE  v_playeraway INTEGER DEFAULT 0;
DECLARE  v_playerawaypoints INTEGER DEFAULT 0;
DECLARE  v_playerhomeadv1 INTEGER DEFAULT 0;
DECLARE  v_playerawayadv1 INTEGER DEFAULT 0;
DECLARE  v_playerhomeadv2 INTEGER DEFAULT 0;
DECLARE  v_playerawayadv2 INTEGER DEFAULT 0;
DECLARE  v_goalshome INTEGER DEFAULT 0;
DECLARE  v_goalsaway INTEGER DEFAULT 0;
DECLARE  v_season INTEGER DEFAULT 8;

DEClARE CALCULATE_CUR CURSOR FOR 

SELECT EUROLEAGUE_GAMES.ID, EUROLEAGUE_GAMES.GAMEWEEK, EUROLEAGUE_GAMES.PLAYER_HOME, SCO1.GAMEWEEK_POINTS, EUROLEAGUE_GAMES.PLAYER_AWAY, SCO2.GAMEWEEK_POINTS ,
case 
when floor((SCO1.GAMEWEEK_POINTS-SCO2.GAMEWEEK_POINTS)/10) > 0 then floor((SCO1.GAMEWEEK_POINTS-SCO2.GAMEWEEK_POINTS)/10)
else 0 end  as player_home_adv,
case when SCO1.GAMEWEEK_POINTS between 70 and 85 then 1
	 when SCO1.GAMEWEEK_POINTS between 85 and 100 then 2
	 when SCO1.GAMEWEEK_POINTS > 100 then 3 
else 0 end as player_home_adv2,
case 
when floor((SCO2.GAMEWEEK_POINTS-SCO1.GAMEWEEK_POINTS)/10) > 0 then floor((SCO2.GAMEWEEK_POINTS-SCO1.GAMEWEEK_POINTS)/10)
else 0 end  as player_away_adv,
case when SCO2.GAMEWEEK_POINTS between 70 and 85 then 1
	 when SCO2.GAMEWEEK_POINTS between 85 and 100 then 2
	 when SCO2.GAMEWEEK_POINTS > 100 then 3
else 0 end as player_away_adv2

FROM EUROLEAGUE_GAMES 
JOIN SEASON_CALENDAR ON EURO_GK = EUROLEAGUE_GAMES.GAMEWEEK 
AND SEASON_CALENDAR.season = v_season
JOIN GAMEWEEK_INFO SCO1 ON SCO1.GAMEWEEK = SEASON_CALENDAR.GAMEWEEK
AND SCO1.SEASON = EUROLEAGUE_GAMES.SEASON
AND SCO1.season = v_season
AND PLAYER_HOME =  SCO1.PLAYER_ID
JOIN GAMEWEEK_INFO SCO2 ON SCO2.GAMEWEEK = SEASON_CALENDAR.GAMEWEEK
AND SCO2.SEASON = EUROLEAGUE_GAMES.SEASON
AND PLAYER_AWAY =  SCO2.PLAYER_ID
AND SCO2.season = v_season;


DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

OPEN CALCULATE_CUR;

read_loop: LOOP
FETCH CALCULATE_CUR INTO v_updateid, v_gameweek, v_playerhome, v_playerhomepoints, v_playeraway, v_playerawaypoints, v_playerhomeadv1, v_playerhomeadv2, v_playerawayadv1, v_playerawayadv2;

    IF done THEN
      LEAVE read_loop;	
    END IF;

	SET v_goalshome = v_playerhomeadv1 + v_playerhomeadv2;
	SET v_goalsaway = v_playerawayadv1 + v_playerawayadv2;

	IF v_goalshome > v_goalsaway THEN
		SET v_playerhomepoints = 3;
		SET v_playerawaypoints = 0;
	ELSEIF v_goalshome < v_goalsaway THEN
		SET v_playerhomepoints = 0;
		SET v_playerawaypoints = 3;
	ELSEIF v_goalshome = v_goalsaway THEN
		SET v_playerhomepoints = 1;
		SET v_playerawaypoints = 1;
	END IF;
	
UPDATE EUROLEAGUE_GAMES set GOALS_HOME = v_goalshome, GOALS_AWAY = v_goalsaway, POINTS_HOME = v_playerhomepoints, POINTS_AWAY = v_playerawaypoints, UPDATE_DTM = NOW()  
WHERE EUROLEAGUE_GAMES.ID = v_updateid;

END LOOP;

CLOSE CALCULATE_CUR;

END //

DELIMITER ;
