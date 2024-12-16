#!/bin/sh
#We download al the content of production and zip it in a backup folder with the date

FTPHOST=files.000webhost.com/
FTPFOLDER=/public_html/mysqlbackup
#Encript Credentials

FTPUSR="testtesttestbroda"
FTPPWD="br0d4huthost"

DBUSR="dbadmin"
DBPWD="br0d4hut"
DBNAME="BRODAHUT"

BACKUPDIR="/var/www/backups/"
DATE=$(date +%d%m%Y)
LOGFILE=$DATE".log"


touch $BACKUPDIR$LOGFILE
echo $DATE - $(date +%H:%M:%S) " - Logfile created" >> $BACKUPDIR/$LOGFILE 2>&1

#Create directory with new backup
echo $DATE - $(date +%H:%M:%S) " - Creating directory" >> $BACKUPDIR/$LOGFILE 2>&1
mkdir $BACKUPDIR/$DATE >> $BACKUPDIR/$LOGFILE 2>&1
#Go to directory
cd $BACKUPDIR$DATE >> $BACKUPDIR/$LOGFILE 2>&1

#We call the script to generate the backup remotely
echo $DATE - $(date +%H:%M:%S) " - Generating backup remotely..." >> $BACKUPDIR/$LOGFILE 2>&1
wget http://brodahut.comlu.com/backupMysql.php >> $BACKUPDIR/$LOGFILE 2>&1

#CREATES BACKUP IN THE CURRENT FOLDER
echo $DATE - $(date +%H:%M:%S) " - Creating backup" >> $BACKUPDIR/$LOGFILE 2>&1
wget -r -np -nH --cut-dirs 2 ftp://$FTPUSR:$FTPPWD@$FTPHOST$FTPFOLDER/ >> $BACKUPDIR/$LOGFILE 2>&1

#We filter only the INSERT statemtns and filter out some statements that dont apply.
echo $DATE - $(date +%H:%M:%S) " - Generating insert file for updates" >> $BACKUPDIR/$LOGFILE 2>&1
grep "INSERT INTO.*\\;$" /var/www/backups/$DATE/mysqlbackup/backup.sql | grep -v "INSERT INTO MANAGER_SEASON_V*" | grep -v "INSERT INTO MANAGER_MONTH_V*" | grep -v "INSERT INTO KNOCKOUT_TABLE*" > /var/www/backups/$DATE/mysqlbackup/$DATE.sql

#We only run the script if there are any new records
if [ -s /var/www/backups/$DATE/mysqlbackup/$DATE.sql ]
then
	echo $DATE - $(date +%H:%M:%S) " - Truncating tables" >> $BACKUPDIR/$LOGFILE 2>&1
	mysql -h "localhost" -u $DBUSR "-p"$DBPWD $DBNAME < /var/www/html/scripts/truncateTables.sql >> $BACKUPDIR/$LOGFILE 2>&1
	if [ $? = "0" ]; then
		echo $DATE - $(date +%H:%M:%S) " - Tables truncated" >> $BACKUPDIR/$LOGFILE 2>&1
		echo $DATE - $(date +%H:%M:%S) " - Running Insert script" >> $BACKUPDIR/$LOGFILE 2>&1	
		mysql -h "localhost" -u $DBUSR "-p"$DBPWD $DBNAME < /var/www/backups/$DATE/mysqlbackup/$DATE.sql >> $BACKUPDIR/$LOGFILE 2>&1
		
		if [ $? = "0" ]; then
				echo $DATE - $(date +%H:%M:%S) " - MySQL executed ok" >> $BACKUPDIR/$LOGFILE 2>&1
				echo $DATE - $(date +%H:%M:%S) " - Zipping backup" >> $BACKUPDIR/$LOGFILE 2>&1
				cd $BACKUPDIR
				tar -zcvf $DATE.gz $BACKUPDIR$DATE >> $BACKUPDIR/$LOGFILE 2>&1

				echo $DATE - $(date +%H:%M:%S) " - Deleting folder" >> $BACKUPDIR/$LOGFILE 2>&1
				rm -r $DATE/
				echo $DATE - $(date +%H:%M:%S) " - Job finished successfully" >> $BACKUPDIR/$LOGFILE 2>&1

		else
				echo $DATE - $(date +%H:%M:%S) " - MySQL executed failed - Job has been interrupted" >> $BACKUPDIR/$LOGFILE 2>&1
		fi
	else
				echo $DATE - $(date +%H:%M:%S) " - Failed truncating tables - Job has been interrupted" >> $BACKUPDIR/$LOGFILE 2>&1
	fi
else
	echo $DATE - $(date +%H:%M:%S) " - The file is empty - Job has been interrupted" >> $BACKUPDIR/$LOGFILE 2>&1
fi


