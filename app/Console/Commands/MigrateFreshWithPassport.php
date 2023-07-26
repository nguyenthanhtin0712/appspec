<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class MigrateFreshWithPassport extends Command
{
    protected $signature = 'migrate:freshPassport';

    protected $description = 'Fresh migrate the database and install Passport';

    public function handle()
    {
        $this->call('migrate:fresh', [
            '--seed' => true,
            '--force' => true
        ]);
        $this->call('passport:install');
        $this->info('Database fresh migrated with Passport installed.');
    }
}
