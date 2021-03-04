@servers(['local' => ['127.0.0.1'], ])

@setup
    $now = now();
@endsetup


@task('rc', ['on' =>['local'],],)
    cd /home/alex/projects/notes-react
    php artisan migrate
    echo {{$now}}
@endtask

@after
    if ($task === 'rc') {
        //echo $now;
    }
@endafter