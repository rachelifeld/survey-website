-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: localhost    Database: surveys
-- ------------------------------------------------------
-- Server version	8.0.29

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `ages`
--

DROP TABLE IF EXISTS `ages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ages` (
  `ageID` int NOT NULL AUTO_INCREMENT,
  `startYear` int DEFAULT NULL,
  `endYear` int DEFAULT NULL,
  PRIMARY KEY (`ageID`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ages`
--

LOCK TABLES `ages` WRITE;
/*!40000 ALTER TABLE `ages` DISABLE KEYS */;
INSERT INTO `ages` VALUES (1,14,25),(2,26,32),(3,33,45),(5,46,55),(6,56,70),(8,71,120);
/*!40000 ALTER TABLE `ages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `areas`
--

DROP TABLE IF EXISTS `areas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `areas` (
  `areaID` int NOT NULL AUTO_INCREMENT,
  `area` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`areaID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `areas`
--

LOCK TABLES `areas` WRITE;
/*!40000 ALTER TABLE `areas` DISABLE KEYS */;
INSERT INTO `areas` VALUES (1,' מחוז צפון'),(2,'מחוז דרום'),(3,'מחוז מרכז'),(4,'ירושלים והסביבה');
/*!40000 ALTER TABLE `areas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `genders`
--

DROP TABLE IF EXISTS `genders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `genders` (
  `genderID` int NOT NULL AUTO_INCREMENT,
  `gender` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`genderID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `genders`
--

LOCK TABLES `genders` WRITE;
/*!40000 ALTER TABLE `genders` DISABLE KEYS */;
INSERT INTO `genders` VALUES (1,'זכר'),(2,'נקבה');
/*!40000 ALTER TABLE `genders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sectors`
--

DROP TABLE IF EXISTS `sectors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sectors` (
  `sectorID` int NOT NULL AUTO_INCREMENT,
  `sector` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`sectorID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sectors`
--

LOCK TABLES `sectors` WRITE;
/*!40000 ALTER TABLE `sectors` DISABLE KEYS */;
INSERT INTO `sectors` VALUES (1,'חרדי'),(2,'דתי לאומי'),(3,'חילוני'),(4,'ערבי'),(5,'אחר');
/*!40000 ALTER TABLE `sectors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `surveyanswers`
--

DROP TABLE IF EXISTS `surveyanswers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `surveyanswers` (
  `answerCode` int NOT NULL AUTO_INCREMENT,
  `questionCode` int NOT NULL,
  `answer` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`answerCode`)
) ENGINE=InnoDB AUTO_INCREMENT=286 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `surveyanswers`
--

LOCK TABLES `surveyanswers` WRITE;
/*!40000 ALTER TABLE `surveyanswers` DISABLE KEYS */;
INSERT INTO `surveyanswers` VALUES (147,48,'רווק'),(148,48,'נשוי'),(149,48,'גרוש'),(150,49,'לפני גיל 24'),(151,49,'בין גיל 24 ל30'),(152,49,'אחרי גיל 30'),(153,50,'ש\"ס'),(154,50,'ליכוד'),(155,50,'הציונות הדתית'),(156,50,'יהדות התורה'),(157,50,'יש עתיד'),(158,50,'אחר'),(159,51,'ימני'),(160,52,'גורם דתי'),(161,52,'גורם כלכלי'),(162,51,'מרכז'),(163,51,'שמאלני'),(164,52,'גורם מדיני'),(165,53,'פחות משלוש'),(166,53,'בין שלוש לשבע'),(167,53,'יותר משבע'),(168,54,'נאמנות'),(169,54,'הומור'),(170,54,'מוסריות'),(171,54,'חכמה'),(176,56,'במשך שעתיים לכל היותר'),(177,56,'במשך כ10 שעות'),(178,56,'במשך כמה ימים'),(179,56,'לא לומד למבחנים'),(180,57,'מעל 95'),(181,57,'בין 85 ל95'),(182,57,'בין 65 ל75'),(183,57,'בין 75 ל85'),(184,58,'5 יחידות'),(185,58,'4 יחידות'),(186,57,'מתחת 65'),(187,58,'3 יחידות'),(193,61,'פחות משעה'),(194,61,'בין שעה לשלוש שעות'),(195,61,'יותר משלוש שעות'),(196,62,'לימודים או עבודה'),(197,62,'עזרה טכנית'),(198,62,'בילוי '),(199,63,'פחות מ5 שעות'),(200,63,'יותר משמונה שעות'),(201,63,'בין 5 לשמונה שעות'),(202,64,'בשעות הבוקר'),(203,64,'בשעות הצהריים'),(204,64,'בשעות הערב'),(205,64,'אין הבדל בין השעות'),(206,64,'בשעות לילה מאוחרות'),(207,65,'כן'),(208,65,'לא'),(209,65,'לקריאה בלבד'),(210,66,'לפני גיל 5'),(211,66,'בין גיל 10 לגיל 15'),(212,66,'בין גיל 5 לגיל 10'),(213,66,'אחרי גיל 15'),(214,66,'לעת זקנה בלבד'),(215,67,'משקפיים'),(216,67,'עדשות מגע'),(217,68,'כחול'),(218,68,'ירוק'),(219,68,'חום'),(220,68,'אפור'),(221,68,'שחור'),(222,68,'דבש'),(223,69,'בהיר'),(224,69,'שחום'),(225,69,'שזוף'),(226,71,'סכנת חיים'),(227,71,'משפיע לטווח הרחוק'),(228,71,'גירוי חיצוני בלבד'),(229,70,'כן'),(230,70,'לא'),(231,72,'תפוח'),(232,72,'ענבים'),(233,72,'אגס'),(234,74,'כפיות טובה'),(235,74,'אגואיזם'),(236,74,'כעס'),(237,74,'צביעות'),(238,74,'קמצנות'),(239,73,'נתינה'),(240,73,'הקשבה'),(241,73,'מצפון'),(242,73,'שמחה'),(243,74,'גאווה'),(244,73,'שלווה'),(245,73,'אחר'),(246,75,'כן'),(247,75,'לא'),(248,76,'סוף שבוע'),(249,76,'תחילת שבוע'),(250,76,'אין הבדל בין הזמנים'),(251,77,'טכנולוגי'),(252,77,'חינוך'),(253,77,'עיצוב'),(254,77,'אחר'),(255,77,'עסקים'),(256,77,'כלכלה'),(257,78,'בין ששת אלפים לעשרת אלפים'),(258,78,'פחות מששת אלפים'),(259,78,'בין 15 אלף ל20 אלף'),(260,78,'בין עשרת אלפים ל15 אלף'),(261,78,'יותר מ30 אלף'),(262,78,'בין 20 אלף ל30 אלף'),(263,79,'אמא'),(264,79,'אבא'),(265,79,'סבא או סבתא'),(266,79,'אח או אחות'),(267,79,'אחר'),(268,80,'כל הזמן'),(269,80,'כ-3 פעמים בשבוע'),(270,80,'פעם בשבועיים'),(271,80,'פעם או פעמיים בשבוע'),(272,80,'פעם בחודש'),(273,80,'אחר'),(276,82,'מתחת 50'),(277,82,'בין 50 ל60'),(278,82,'בין 60 ל70'),(279,82,'בין 70 ל80'),(280,83,'לא'),(281,82,'מעל 100'),(282,83,'כן'),(283,82,'בין 80 ל100'),(284,84,'כן'),(285,84,'לא');
/*!40000 ALTER TABLE `surveyanswers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `surveydata`
--

DROP TABLE IF EXISTS `surveydata`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `surveydata` (
  `surveyDataCode` int NOT NULL AUTO_INCREMENT,
  `userCode` int NOT NULL,
  `answerCode` int NOT NULL,
  PRIMARY KEY (`surveyDataCode`),
  KEY `userID_idx` (`userCode`),
  CONSTRAINT `userCode` FOREIGN KEY (`userCode`) REFERENCES `users` (`userCode`)
) ENGINE=InnoDB AUTO_INCREMENT=455 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `surveydata`
--

LOCK TABLES `surveydata` WRITE;
/*!40000 ALTER TABLE `surveydata` DISABLE KEYS */;
INSERT INTO `surveydata` VALUES (181,21,147),(182,21,150),(183,21,156),(184,21,159),(185,21,160),(186,21,168),(187,21,166),(188,23,167),(189,23,169),(190,22,156),(191,22,159),(192,22,160),(193,22,165),(194,22,168),(195,24,167),(196,24,170),(197,24,156),(198,24,159),(199,24,160),(201,25,153),(202,25,159),(203,25,160),(204,25,166),(205,25,169),(206,26,156),(207,26,159),(208,26,160),(209,27,170),(210,27,166),(211,27,157),(212,27,163),(213,27,161),(215,28,155),(216,28,159),(217,28,164),(218,28,167),(219,28,169),(221,29,166),(222,29,168),(223,29,158),(224,29,162),(225,29,161),(227,30,156),(228,30,159),(229,30,160),(230,31,156),(231,31,159),(232,31,160),(233,31,165),(234,31,171),(235,32,167),(236,32,168),(237,32,159),(238,32,160),(240,32,178),(241,32,180),(242,32,184),(243,33,156),(244,33,159),(245,33,160),(246,33,177),(247,33,181),(248,33,185),(249,33,166),(250,33,169),(251,34,159),(252,34,160),(253,34,153),(254,34,178),(255,34,180),(256,34,185),(257,34,170),(258,34,166),(259,21,177),(260,21,181),(261,21,184),(263,26,147),(264,26,150),(265,35,156),(266,35,159),(267,35,160),(268,36,156),(269,36,159),(270,36,160),(271,36,147),(272,36,150),(273,37,148),(274,37,152),(275,37,194),(276,37,198),(277,38,153),(278,38,159),(279,38,160),(280,38,195),(281,38,196),(282,35,201),(283,35,205),(284,32,195),(285,32,196),(286,32,147),(287,32,150),(288,32,207),(289,32,211),(290,32,215),(291,39,178),(292,39,181),(293,39,185),(294,39,194),(295,39,198),(296,39,207),(297,39,213),(298,39,215),(299,39,165),(300,39,168),(301,39,154),(302,39,159),(303,39,164),(304,39,148),(305,39,151),(306,39,201),(307,39,202),(308,40,147),(309,40,151),(310,40,201),(311,40,206),(312,40,157),(313,40,163),(314,40,161),(315,40,207),(316,40,211),(317,40,216),(318,40,195),(319,40,198),(320,40,178),(321,40,181),(322,40,185),(323,40,166),(324,40,168),(325,41,195),(326,41,198),(327,41,176),(328,41,181),(329,41,187),(330,41,209),(331,41,214),(332,41,215),(333,41,200),(334,41,202),(335,41,157),(336,41,161),(337,41,162),(338,41,148),(339,41,151),(340,41,166),(341,41,170),(342,42,149),(343,42,152),(344,42,195),(345,42,198),(346,42,158),(347,42,162),(348,42,164),(349,42,208),(350,42,176),(351,42,180),(352,42,184),(353,42,167),(354,42,171),(355,42,199),(356,42,204),(357,43,158),(358,43,163),(359,43,160),(360,43,147),(361,43,150),(362,43,208),(363,43,168),(364,43,167),(365,43,178),(366,43,182),(367,43,187),(368,43,195),(369,43,198),(370,43,201),(371,43,205),(372,44,176),(373,44,182),(374,44,187),(375,44,158),(376,44,159),(377,44,164),(378,44,167),(379,44,169),(380,44,207),(381,44,212),(382,44,216),(383,44,199),(384,44,206),(385,44,147),(386,44,151),(387,44,198),(388,44,195),(389,44,219),(390,44,224),(391,26,176),(392,26,180),(393,26,184),(394,26,195),(395,26,196),(396,26,167),(397,26,168),(398,26,208),(399,26,217),(400,26,225),(401,26,201),(402,26,202),(403,47,207),(404,47,211),(405,47,215),(406,26,230),(407,21,207),(408,21,210),(409,21,215),(410,21,230),(411,21,199),(412,21,206),(413,21,195),(414,21,196),(415,21,220),(416,21,225),(417,48,149),(418,48,152),(419,48,166),(420,48,170),(421,48,155),(422,48,159),(423,48,164),(424,49,207),(425,49,214),(426,49,216),(427,49,218),(428,49,223),(429,49,195),(430,49,198),(431,49,230),(432,49,148),(433,49,151),(434,49,154),(435,49,159),(436,49,164),(437,50,208),(438,51,208),(439,51,230),(440,51,201),(441,51,202),(442,51,147),(443,51,150),(444,51,239),(445,51,243),(446,52,218),(447,52,225),(448,52,147),(449,52,150),(450,52,166),(451,52,168),(452,53,155),(453,53,159),(454,53,164);
/*!40000 ALTER TABLE `surveydata` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `surveys`
--

DROP TABLE IF EXISTS `surveys`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `surveys` (
  `surveyCode` int NOT NULL AUTO_INCREMENT,
  `surveyTitle` varchar(45) DEFAULT NULL,
  `userCode` int NOT NULL,
  `report` tinyint DEFAULT '0',
  `showResults` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`surveyCode`),
  KEY `surveyCode_idx` (`userCode`)
) ENGINE=InnoDB AUTO_INCREMENT=74 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `surveys`
--

LOCK TABLES `surveys` WRITE;
/*!40000 ALTER TABLE `surveys` DISABLE KEYS */;
INSERT INTO `surveys` VALUES (54,'נישואין',21,0,1),(55,'בחירות 2022',21,0,1),(56,'חברה',21,0,1),(58,'לימודים',32,0,1),(61,'טכנולוגיה',37,0,1),(62,'שינה',38,0,1),(63,'משקפיים',32,0,1),(64,'יופי',44,0,1),(65,'אלרגיות',47,0,1),(66,'תפוח ענבים אגס',35,1,1),(67,'מידות',51,0,1),(68,'שתיה מתוקה',21,0,1),(69,'פרנסה',53,0,1),(70,'משפחה',53,0,1),(72,'דיאטה',53,0,1),(73,'גרפולוגיה',53,0,1);
/*!40000 ALTER TABLE `surveys` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `surveysquestions`
--

DROP TABLE IF EXISTS `surveysquestions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `surveysquestions` (
  `questionCode` int NOT NULL AUTO_INCREMENT,
  `question` varchar(255) NOT NULL,
  `surveyCode` int DEFAULT NULL,
  PRIMARY KEY (`questionCode`)
) ENGINE=InnoDB AUTO_INCREMENT=85 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `surveysquestions`
--

LOCK TABLES `surveysquestions` WRITE;
/*!40000 ALTER TABLE `surveysquestions` DISABLE KEYS */;
INSERT INTO `surveysquestions` VALUES (48,'מה הסטטוס שלך?',54),(49,'מהו הגיל האידיאלי לדעתך להתחתן?',54),(50,'לאיזו מפלגה אתה מצביע?',55),(51,'איך אתה מגדיר את עצמך מבחינה פוליטית?',55),(52,'מהו הגורם המרכזי לפיו תבחר במפלגה?',55),(53,'כמה חברים קרובים יש לך?',56),(54,'מה התכונה שהכי תרצה לראות בחברך?',56),(56,'כמה זמן אתה לומד למבחן?',58),(57,'מה ממוצע הציונים שלך במתמטיקה?',58),(58,'כמה יחידות עשית במתמטיקה?',58),(61,'כמה זמן ביום אתה משתמש בטכנולוגיה?',61),(62,'מה מטרת השימוש שלך בטכנולוגיה בדרך כלל?',61),(63,'כמה שעות אתה ישן ביום?',62),(64,'באיזה שעה אתה הכי עירני ביום?',62),(65,'האם אתה מרכיב משקפיים?',63),(66,'מאיזה גיל יש לך משקפיים?',63),(67,'במה אתה יותר משתמש?',63),(68,'איזה צבע עיניים אתה מעדיף',64),(69,'איזה צבע עור אתה מעדיף',64),(70,'האם יש לך אלרגיה כלשהי?',65),(71,'אם כן, מהי חומרת האלרגיה?',65),(72,'תפוח ענבים אגס?',66),(73,'מהי המידה היפה ביותר באדם בעניך?',67),(74,'מהי המידה הרעה ביותר בעניך?',67),(75,'האם אתה צורך שתיה מתוקה?',68),(76,'באיזה זמן בעיקר אתה שותה שתיה מתוקה?',68),(77,'באיזה תחום אתה עובד?',69),(78,'כמה אתה מרוויח בחודש?',69),(79,'לאיזה בן משפחה אתה הכי קשור?',70),(80,'כמה פעמים בשבוע אתה מתראה עם בני משפחתיך?',70),(82,'כמה אתה שוקל?',72),(83,'האם אתה מרוצה מהמשקל שלך?',72),(84,'האם אתה מאמין בגרפולוגיה?',73);
/*!40000 ALTER TABLE `surveysquestions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `userCode` int NOT NULL AUTO_INCREMENT,
  `userEmail` varchar(45) DEFAULT NULL,
  `userPassword` varchar(45) DEFAULT NULL,
  `manager` tinyint(1) DEFAULT '0',
  `birthYear` int DEFAULT NULL,
  `areaID` int DEFAULT NULL,
  `genderID` int DEFAULT NULL,
  `sectorID` int DEFAULT NULL,
  PRIMARY KEY (`userCode`),
  KEY `users_ibfk_6` (`areaID`),
  KEY `users_ibfk_7` (`genderID`),
  KEY `users_ibfk_8` (`sectorID`),
  CONSTRAINT `users_ibfk_10` FOREIGN KEY (`areaID`) REFERENCES `areas` (`areaID`),
  CONSTRAINT `users_ibfk_11` FOREIGN KEY (`genderID`) REFERENCES `genders` (`genderID`),
  CONSTRAINT `users_ibfk_12` FOREIGN KEY (`sectorID`) REFERENCES `sectors` (`sectorID`),
  CONSTRAINT `users_ibfk_14` FOREIGN KEY (`areaID`) REFERENCES `areas` (`areaID`),
  CONSTRAINT `users_ibfk_15` FOREIGN KEY (`genderID`) REFERENCES `genders` (`genderID`),
  CONSTRAINT `users_ibfk_16` FOREIGN KEY (`sectorID`) REFERENCES `sectors` (`sectorID`),
  CONSTRAINT `users_ibfk_2` FOREIGN KEY (`areaID`) REFERENCES `areas` (`areaID`),
  CONSTRAINT `users_ibfk_3` FOREIGN KEY (`genderID`) REFERENCES `genders` (`genderID`),
  CONSTRAINT `users_ibfk_4` FOREIGN KEY (`sectorID`) REFERENCES `sectors` (`sectorID`),
  CONSTRAINT `users_ibfk_6` FOREIGN KEY (`areaID`) REFERENCES `areas` (`areaID`),
  CONSTRAINT `users_ibfk_7` FOREIGN KEY (`genderID`) REFERENCES `genders` (`genderID`),
  CONSTRAINT `users_ibfk_8` FOREIGN KEY (`sectorID`) REFERENCES `sectors` (`sectorID`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (21,'r0527115492@gmail.com','123',1,2003,4,2,1),(22,'sterhaimov@gmail.com','6184',0,2003,4,2,1),(23,'dassifeld@gmail.com','123',0,2005,4,2,1),(24,'ruth.rogoway@gmail.com','9960812',0,2003,2,2,1),(25,'riki@gmail.com','123',0,1998,4,2,1),(26,'miri@gmail.com','123',0,2003,3,2,1),(27,'d@gmail.com','123',0,1996,3,1,3),(28,'yuda@gmail.com','123',0,1978,4,1,2),(29,'sivan@gmail.com','123',0,1990,3,2,3),(30,'yanki@gmail.com','123',0,1993,3,1,1),(31,'elish@gmail.com','123',0,1995,3,2,1),(32,'batchen@gmail.com','123',0,2003,4,2,1),(33,'tamar@gmail.com','123',0,2003,4,2,1),(34,'ruthm@gmail.com','123',0,2003,4,2,1),(35,'ester@gmail.com','123',0,2003,4,2,1),(36,'orit@gmail.com','123',0,2003,4,2,1),(37,'hhh@gmail.com','123',0,2003,1,1,1),(38,'efratb@gmail.com','123',0,2003,4,2,1),(39,'bibi@gmail.com','123',0,1962,2,1,3),(40,'bar@gmail.com','123',0,1996,3,2,3),(41,'doron@gmail.com','123',0,1980,1,1,3),(42,'mishel@gmail.com','123',0,1983,2,2,2),(43,'achmed@gmail.com','123',0,2000,3,1,4),(44,'avram@gmail.com','123',0,1990,2,1,3),(45,'avi@gmail.com','123',0,1997,1,1,3),(46,'jj@gmail.com','eee',0,2002,1,1,1),(47,'moshe@gmail.com','123',0,1983,3,1,2),(48,'shlomi@gmail.com','123',0,1974,4,1,2),(49,'ronit@gmail.com','123',0,1986,3,2,3),(50,'rut@gmail.com','123',0,2003,2,2,1),(51,'chani@gmail.com','123',0,2002,4,2,1),(52,'tzipi@gmail.com','123',0,2002,4,2,1),(53,'menachen@gmail.com','123',0,1986,3,1,2);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-07-25 12:15:04
