<?php

$got = $_POST['data'];
$got = json_decode($got);

$user =
[
    'IP' => $got[0]->IP,
    'age' => $got[0]->age,
    'sex' => $got[0]->sex,
    'discipline' => $got[0]->discipline,
    'vision' => $got[0]->vision,
    'resolution' => $got[0]->resolution,
    'isNoticed' => $got[6]->isNoticed,
    'noticeNumber' => $got[6]->noticeNumber,
    'report'=>$got[0]->report
];

try {
    $db = new PDO('mysql:host=127.0.0.1;dbname=thesis', 'root', '010011');
    $query = 'INSERT INTO user(IP,age,sex,discipline,vision,resolution,isNoticed,noticeNumber,report) VALUES(:IP,:age,:sex,:discipline,:vision,:resolution,:isNoticed,:noticeNumber,:report)';
    $stmt = $db->prepare($query);
    $stmt->execute($user);
    $user_id = $db->lastInsertId();
        echo    $user_id;


    $query = 'INSERT INTO reaction(
                testNumber,
                testAreaStartTime,
                testAreaInterval,
                testAreaWidth,
                testAreaHeight,
                subjectEndTime,
                reactionTime,
                triggerStartAt,
                triggerEndAt,
                triggerColor,
                triggerPosition,
                triggerInterval,
                user_id
            ) VALUES(
                :testNumber,
                :testAreaStartTime,
                :testAreaInterval,
                :testAreaWidth,
                :testAreaHeight,
                :subjectEndTime,
                :reactionTime,
                :triggerStartAt,
                :triggerEndAt,
                :triggerColor,
                :triggerPosition,
                :triggerInterval,
                :user_id
            )';

    for ($i = 1; $i <= 5; ++$i) {
        $reactionTest = get_object_vars($got[$i]);
        $reactionTest['user_id'] = $user_id;
        $stmt = $db->prepare($query);
        $stmt->execute($reactionTest);
    }

} catch (Exception $e) {
    echo $e;
}
