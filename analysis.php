<?php
try {
    $db = new PDO('mysql:host=127.0.0.1;dbname=thesis', 'root', '010011');
    $res = $db->query("SELECT * FROM user");
    $users = $res->fetchall(PDO::FETCH_ASSOC);
    $rowsnumber = count($users);

    for ($i=0; $i <$rowsnumber ; $i++) {
        $query="SELECT * FROM reaction where user_id={$users[$i]['id']}";
            $get = $db->query($query);
            $reaction[] = $get->fetchall(PDO::FETCH_ASSOC);
    }


} catch (Exception $e) {
    echo $e->message();
}
?>

<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>检视器</title>
    <link href="library/materialize/css/materialize.min.css" rel="stylesheet">
    <style media="screen">
            .collapsible-header {
            display: block;
            cursor: pointer;
            min-height: 2rem;
            line-height: 10px;
            padding: 0 1rem;
            background-color: rgba(177, 223, 251, 0.58);
        }
        li{
                margin-bottom: 5px;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="row">
            <div class="col s12 m12 l12">
                <div id="introduction" class="section scrollspy">
                    <h4>数据集</h4>
                    <p class="caption">
                        Collapsibles are accordion elements that expand when clicked on. They allow you to hide content that is not immediately relevant to the user.
                    </p>
                    <ul class="collapsible collapsible-accordion" data-collapsible="accordion">


                        <?php for($i=0;$i<$rowsnumber;$i++){ ?>
                        <li class="">
                            <div class="collapsible-header">
                                <table>
                                    <tbody>
                                        <tr>
                                            <td><?php echo $users[$i]['age']; ?></td>
                                            <td><?php echo $users[$i]['sex']; ?></td>
                                            <td><?php echo $users[$i]['discipline']; ?></td>
                                            <td><?php echo $users[$i]['vision']; ?></td>
                                            <td><?php echo $users[$i]['resolution']; ?></td>
                                            <td><?php echo $users[$i]['IP']; ?></td>
                                            <td><?php echo $users[$i]['report']; ?></td>
                                            <td><?php echo $users[$i]['isNoticed']; ?></td>
                                            <td><?php echo $users[$i]['noticeNumber']; ?></td>
                                        </tr>
                                    </tbody>
                                </table>

                            </div>
                            <div class="collapsible-body" style="display: none;">
                                <table class="striped">
                                    <thead>
                                        <tr>
                                            <th>TN</th>
                                            <th>TASA</th>
                                            <th>TAIT</th>
                                            <th>TAWD</th>
                                            <th>TAHT</th>
                                            <th>SET</th>
                                            <th>RT</th>
                                            <th>TGSA</th>
                                            <th>TGEA</th>
                                            <th>TGC</th>
                                            <th>TGP</th>
                                            <th>TGIT</th>
                                        </tr>
                                    </thead>
                                    <tbody>


                                        <?php for($k=0;$k<5;$k++){ ?>
                                        <tr>
                                            <td><?php echo $reaction[$i][$k]['testNumber']; ?></td>
                                            <td><?php echo $reaction[$i][$k]['testAreaStartTime']; ?></td>
                                            <td><?php echo $reaction[$i][$k]['testAreaInterval']; ?></td>
                                            <td><?php echo $reaction[$i][$k]['testAreaWidth']; ?></td>
                                            <td><?php echo $reaction[$i][$k]['testAreaHeight']; ?></td>
                                            <td><?php echo $reaction[$i][$k]['subjectEndTime']; ?></td>
                                            <td><?php echo $reaction[$i][$k]['reactionTime']; ?></td>
                                            <td><?php echo $reaction[$i][$k]['triggerEndAt']; ?></td>
                                            <td><?php echo $reaction[$i][$k]['triggerStartAt']; ?></td>
                                            <td><?php echo $reaction[$i][$k]['triggerColor']; ?></td>
                                            <td><?php echo $reaction[$i][$k]['triggerPosition']; ?></td>
                                            <td><?php echo $reaction[$i][$k]['triggerInterval']; ?></td>
                                        </tr>
                                        <?php } ?>


                                    </tbody>
                                </table>
                            </div>
                        </li>
                        <?php } ?>
                    </ul>
                </div>
            </div>
        </div>
    </div>

    <script src="library/jquery.min.js"></script>
    <script src="library/materialize/js/materialize.min.js"></script>
</body>

</html>
