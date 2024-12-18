DELIMITER //

DROP PROCEDURE IF EXISTS UPDATE_CUM ;

CREATE PROCEDURE UPDATE_CUM()

BEGIN
 
DECLARE done INT DEFAULT FALSE;
DECLARE  v_season  INTEGER DEFAULT 6;
DECLARE  v_gameweek  INTEGER DEFAULT 0;
DECLARE  v_player_id INTEGER DEFAULT 0;
DECLARE  v_points INTEGER DEFAULT 0;
DECLARE  v_posprize INTEGER DEFAULT 0;
DECLARE  v_teamsalary INTEGER DEFAULT 0;
DECLARE  v_captain INTEGER DEFAULT 0;
DECLARE  v_lineup INTEGER DEFAULT 0;
DECLARE  v_payments INTEGER DEFAULT 0;
DECLARE  v_futprize INTEGER DEFAULT 0;
DECLARE  v_total INTEGER DEFAULT 0;


DEClARE CUMULATIV_CUR CURSOR FOR 
 select eg.id as GAMEWEEK, PLAYER_ID from EUROLEAGUE_GAMES eg, PLAYERS_INFO pi 
 where eg.id <= 39
 order by eg.id;
 

OPEN CUMULATIV_CUR;

read_loop: LOOP
FETCH CUMULATIV_CUR INTO v_gameweek,v_player_id;

	
    IF done THEN
      LEAVE read_loop;	
    END IF;
	
		SELECT sum(GAMEWEEK_POINTS) INTO v_points FROM GAMEWEEK_INFO WHERE PLAYER_ID = v_player_id and season = v_season AND GAMEWEEK <= v_gameweek;
		SELECT sum(POSITION_PRIZE) INTO v_posprize FROM GAMEWEEK_INFO WHERE PLAYER_ID = v_player_id and season = v_season AND GAMEWEEK <= v_gameweek;
		SELECT sum(TEAM_SALARY) INTO v_teamsalary FROM GAMEWEEK_INFO WHERE PLAYER_ID = v_player_id and season = v_season AND GAMEWEEK <= v_gameweek;
		SELECT sum(CAPTAIN_POINTS) INTO v_captain FROM GAMEWEEK_INFO WHERE PLAYER_ID = v_player_id and season = v_season AND GAMEWEEK <= v_gameweek;
		SELECT sum(BEST_LINEUP) INTO v_lineup FROM GAMEWEEK_INFO WHERE PLAYER_ID = v_player_id and season = v_season AND GAMEWEEK <= v_gameweek;
		SELECT sum(PAYMENT) INTO v_payments FROM GAMEWEEK_INFO WHERE PLAYER_ID = v_player_id and season = v_season AND GAMEWEEK <= v_gameweek;
		SELECT sum(FUTMONDO_PRIZE) INTO v_futprize FROM GAMEWEEK_INFO WHERE PLAYER_ID = v_player_id and season = v_season AND GAMEWEEK <= v_gameweek;
		SELECT sum(TOTAL) INTO v_total FROM GAMEWEEK_INFO WHERE PLAYER_ID = v_player_id and season = v_season AND GAMEWEEK <= v_gameweek;
		
	update GAMEWEEK_INFO 
		set GAMEWEEK_POINTS_CUM = v_points,
			POSITION_PRIZE_CUM = v_posprize,
			TEAM_SALARY_CUM = v_teamsalary,
			CAPTAIN_POINTS_CUM = v_captain,
			BEST_LINEUP_CUM = v_lineup,
			PAYMENTS_CUM = v_payments,
			FUTMONDO_PRIZE_CUM = v_futprize,
			TOTAL_CUM = v_total,
			UPDATE_DTM = NOW() 
	WHERE SEASON = v_season 
	and gameweek = v_gameweek
	AND PLAYER_ID = v_player_id;

 END LOOP;
CLOSE CUMULATIV_CUR;

END //

DELIMITER ;