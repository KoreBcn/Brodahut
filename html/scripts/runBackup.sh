#!/bin/sh
#We download al the content of production and zip it in a backup folder with the date

FTPHOST=files.000webhost.com/
FTPFOLDER=/public_html/
FTPPWD=br0d4huthost
#Encript Credentials
FTPUSR=testtesttestbroda
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

#CREATES BACKUP IN THE CURRENT FOLDER
echo $DATE - $(date +%H:%M:%S) " - Creating backup" >> $BACKUPDIR/$LOGFILE 2>&1
wget -r -np -nH --cut-dirs 2 ftp://$FTPUSR:$FTPPWD@$FTPHOST$FTPFOLDER/ >> $BACKUPDIR/$LOGFILE 2>&1

echo $DATE - $(date +%H:%M:%S) " - Zipping backup" >> $BACKUPDIR/$LOGFILE 2>&1
cd $BACKUPDIR
tar -zcvf $DATE.gz $BACKUPDIR$DATE >> $BACKUPDIR/$LOGFILE 2>&1

echo $DATE - $(date +%H:%M:%S) " - Deleting folder" >> $BACKUPDIR/$LOGFILE 2>&1
rm -r $DATE/
