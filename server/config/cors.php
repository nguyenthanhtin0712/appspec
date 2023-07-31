<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    |
    | Here you may configure your settings for cross-origin resource sharing
    | or "CORS". This determines what cross-origin operations may execute
    | in web browsers. You are free to adjust these settings as needed.
    |
    | To learn more: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
    |
    */
    'paths' => ['api/*'], // Đường dẫn được cho phép CORS, ở đây mình sẽ cho phép tất cả các yêu cầu tới các đường dẫn bắt đầu bằng 'api/'
    'allowed_methods' => ['*'], // Phương thức HTTP được cho phép, ở đây mình cho phép tất cả ('*')
    'allowed_origins' => ['http://localhost:3000'], // Các domain được cho phép gửi yêu cầu, ở đây mình chỉ cho phép domain 'http://localhost:3000'
    'allowed_origins_patterns' => [], // Các mẫu domain được cho phép (nếu có)
    'allowed_headers' => ['*'], // Các header được cho phép, ở đây mình cho phép tất cả ('*')
    'exposed_headers' => [], // Các header có thể được truy cập từ phía client
    'max_age' => 0,
    'supports_credentials' => false,
];
