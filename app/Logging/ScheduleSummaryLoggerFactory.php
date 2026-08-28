<?php

namespace App\Logging;

use Monolog\Logger;

class ScheduleSummaryLoggerFactory
{
    public function __invoke(array $config): Logger
    {
        return new Logger('scheduler-summary', [
            new ScheduleSummaryHandler($config['level'] ?? Logger::DEBUG),
        ]);
    }
}