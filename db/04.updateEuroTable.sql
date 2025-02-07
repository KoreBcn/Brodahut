DELIMITER //

DROP PROCEDURE IF EXISTS UPDATE_EUROTABLE;

CREATE PROCEDURE UPDATE_EUROTABLE()

BEGIN
 
DECLARE done INT DEFAULT FALSE;
DECLARE  v_player varchar(255) DEFAULT "";
DECLARE  v_player_id INTEGER DEFAULT 0;
DECLARE  v_points INTEGER DEFAULT 0;
DECLARE  v_goals_f INTEGER DEFAULT 0;
DECLARE  v_goals_a INTEGER DEFAULT 0;
DECLARE  v_played INTEGER DEFAULT 0;
DECLARE  v_won INTEGER DEFAULT 0;
DECLARE  v_draw INTEGER DEFAULT 0;
DECLARE  v_lost INTEGER DEFAULT 0;
DECLARE  v_season INTEGER DEFAULT 8;


DECLARE CALCULATE_CUR CURSOR FOR Select PLAYER_ID, PLAYER_NAME  from PLAYERS_INFO;
 
DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
 
OPEN CALCULATE_CUR;

read_loop: LOOP
    FETCH CALCULATE_CUR INTO v_player_id, v_player;

    IF done THEN
      LEAVE read_loop;	
    END IF;
	
select SUM(p) into v_played from (
select count(1) as P from EUROLEAGUE_GAMES WHERE season = v_season and PLAYER_HOME = v_player_id AND GOALS_HOME <> '' AND GOALS_AWAY <> '' UNION ALL
select count(1) as P from EUROLEAGUE_GAMES WHERE season = v_season and PLAYER_AWAY = v_player_id AND GOALS_HOME <> '' AND GOALS_AWAY <> ''
)games_played;      
                                                   

select SUM(p) into v_points from (
select SUM(POINTS_HOME) as P from EUROLEAGUE_GAMES WHERE season = v_season and PLAYER_HOME = v_player_id  UNION ALL
select SUM(POINTS_AWAY) as P from EUROLEAGUE_GAMES WHERE season = v_season and PLAYER_AWAY = v_player_id
)points;                                                               
     
select SUM(p) into v_goals_f from (                                                                
select SUM(GOALS_HOME) as P from EUROLEAGUE_GAMES WHERE season = v_season and PLAYER_HOME = v_player_id UNION ALL
select SUM(GOALS_AWAY) as P from EUROLEAGUE_GAMES WHERE season = v_season and PLAYER_AWAY = v_player_id
)goals_favour;
	 
select SUM(p) into v_goals_a from (                                                                
select SUM(GOALS_AWAY) as P from EUROLEAGUE_GAMES WHERE season = v_season and PLAYER_HOME = v_player_id UNION ALL
select SUM(GOALS_HOME) as P from EUROLEAGUE_GAMES WHERE season = v_season and PLAYER_AWAY = v_player_id
)goals_against  ;                                                                                                                              

select SUM(p) into v_won from (                                                                
select count(1) as P from EUROLEAGUE_GAMES WHERE season = v_season and PLAYER_HOME = v_player_id and POINTS_HOME = 3 UNION ALL
select count(1) as P from EUROLEAGUE_GAMES WHERE season = v_season and PLAYER_AWAY = v_player_id and POINTS_AWAY = 3
)victories;

select SUM(p) into v_draw from (                                                                
select count(1) as P from EUROLEAGUE_GAMES WHERE season = v_season and PLAYER_HOME = v_player_id and POINTS_HOME = 1  UNION ALL
select count(1) as P from EUROLEAGUE_GAMES WHERE season = v_season and PLAYER_AWAY = v_player_id and POINTS_AWAY = 1 
)draws;

select SUM(p) into v_lost from (                                                                
select count(1) as P from EUROLEAGUE_GAMES WHERE season = v_season and PLAYER_HOME = v_player_id and POINTS_HOME = 0 and GOALS_HOME != "" UNION ALL
select count(1) as P from EUROLEAGUE_GAMES WHERE season = v_season and PLAYER_AWAY = v_player_id and POINTS_AWAY = 0 and GOALS_AWAY != ""
)lost;


UPDATE EUROLEAGUE_TABLE set update_dtm = NOW(),
		PLAYED = v_played,
		WINS = v_won,
		DRAWS = v_draw,
		LOST = v_lost,
		GOALS_FAVOUR = v_goals_f,
		GOALS_AGAINST = v_goals_a,
		POINTS = v_points
 WHERE PLAYER_ID = v_player_id
 	and season = v_season;
	
  END LOOP;

CLOSE CALCULATE_CUR;

END //

DELIMITER ;