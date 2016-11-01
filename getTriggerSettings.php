<?php

$triggerPosition = ['upRight', 'bottomRight', 'upLeft', 'bottomLeft'];
$triggerColor = ['red', 'green', 'yellow'];
$data = ['triggerPosition' => $triggerPosition[rand(0, 3)], 'triggerColor' => $triggerColor[rand(0, 2)]];
echo json_encode($data);
