<?php
$data = json_decode($_POST['data']);
$ahead=json_decode($_POST['aheadError']);

$user =
[
    'IP' => $data[0]->IP,
    'age' => $data[0]->age,
    'sex' => $data[0]->sex,
    'discipline' => $data[0]->discipline,
    'vision' => $data[0]->vision,
    'resolution' => $data[0]->resolution,
    'isNoticed' => $data[6]->isNoticed,
    'noticeNumber' => $data[6]->noticeNumber,
    'report' => $data[0]->report,
];

try {
    $db = new PDO('mysql:host=127.0.0.1;dbname=thesis', 'root', '010011');
    $query = 'INSERT INTO user(IP,age,sex,discipline,vision,resolution,isNoticed,noticeNumber,report) VALUES(:IP,:age,:sex,:discipline,:vision,:resolution,:isNoticed,:noticeNumber,:report)';
    $stmt = $db->prepare($query);
    $stmt->execute($user);
    $user_id = $db->lastInsertId();

    $aheadtimes = count($ahead);
    for ($i = 0; $i < $aheadtimes; ++$i) {
        $error[$i]['user_id'] = $user_id;
        $error[$i]['testNumber'] = $ahead[$i]->testNumber;
        $error[$i]['ParticipatorPressedSpace'] = $ahead[$i]->subjectEndTime;
        $error[$i]['testAreaColorChangingInterval'] = $ahead[$i]->testAreaInterval;
        $error[$i]['testAreaWidth'] = $ahead[$i]->testAreaWidth;
        $error[$i]['testAreaHeight'] = $ahead[$i]->testAreaHeight;
        $error[$i]['triggerColorChangedTime'] = $ahead[$i]->triggerStartAt;
        $error[$i]['triggerFadeTime'] = $ahead[$i]->triggerEndAt;
        $error[$i]['triggerColor'] = $ahead[$i]->triggerColor;
        $error[$i]['triggerPosition'] = $ahead[$i]->triggerPosition;
        $error[$i]['triggerDisplayInterval'] = $ahead[$i]->triggerInterval;
    }
    $query = 'INSERT INTO ahead(
        user_id,
        testNumber,
        ParticipatorPressedSpace,
        testAreaColorChangingInterval,
        testAreaWidth,
        testAreaHeight,
        triggerColorChangedTime,
        triggerFadeTime,
        triggerColor,
        triggerPosition,
        triggerDisplayInterval
            ) VALUES(
                :user_id,
                :testNumber,
                :ParticipatorPressedSpace,
                :testAreaColorChangingInterval,
                :testAreaWidth,
                :testAreaHeight,
                :triggerColorChangedTime,
                :triggerFadeTime,
                :triggerColor,
                :triggerPosition,
                :triggerDisplayInterval
            )';
    $stmt = $db->prepare($query);
    for ($i = 0; $i < $aheadtimes; ++$i) {
        $stmt->execute($error[$i]);
    }



    $query = 'INSERT INTO reaction(
        user_id,
        testNumber,
        testAreaColorChangedTime,
        teatAreaColorChangingInterval,
        ParticipatorPressedSpace,
        reactionTime,
        testAreaWidth,
        testAreaHeight,
        triggerDisplayAt,
        triggerFadeTime,
        triggerColor,
        triggerPosition,
        triggerDisplayInterval
            ) VALUES(
            :user_id,
            :testNumber,
            :testAreaColorChangedTime,
            :testAreaColorChangingInterval,
            :ParticipatorPressedSpace,
            :reactionTime,
            :testAreaWidth,
            :testAreaHeight,
            :triggerDisplayAt,
            :triggerFadeTime,
            :triggerColor,
            :triggerPosition,
            :triggerDisplayInterval
            )';
            $stmt = $db->prepare($query);

    for ($i = 1; $i <= 5; ++$i) {
        $reactionTest['user_id'] = $user_id;
        $reactionTest['testNumber'] = $i;
        $reactionTest['testAreaColorChangedTime'] = $data[$i]->testAreaStartTime;
        $reactionTest['testAreaColorChangingInterval'] = $data[$i]->testAreaInterval;
        $reactionTest['ParticipatorPressedSpace'] = $data[$i]->subjectEndTime;
        $reactionTest['reactionTime'] = $data[$i]->reactionTime;
        $reactionTest['testAreaWidth'] = $data[$i]->testAreaWidth;
        $reactionTest['testAreaHeight'] = $data[$i]->testAreaHeight;

        $reactionTest['triggerDisplayAt'] = $data[$i]->triggerStartAt;
        $reactionTest['triggerFadeTime'] = $data[$i]->triggerEndAt;
        $reactionTest['triggerColor'] = $data[$i]->triggerColor;
        $reactionTest['triggerPosition'] = $data[$i]->triggerPosition;
        $reactionTest['triggerDisplayInterval'] = $data[$i]->triggerInterval;

        $stmt->execute($reactionTest);

    }
} catch (Exception $e) {
    echo $e;
}
