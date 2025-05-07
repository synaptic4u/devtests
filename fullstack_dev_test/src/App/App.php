<?php

namespace Synaptic4U\App;

use Exception;

/**
 * Class App
 *
 * This class handles the initialization and routing of application requests.
 * It sets up configuration, request, and response properties and processes
 * POST requests to route them to the appropriate controller and method.
 * If the specified class or method does not exist, it captures the error
 * and stores it in the response.
 */
class App
{

    private $config;
    private $response;
    private $request;
    public function __construct($con = null, $call = null)
    {
        try {
            $this->config = [
                "db_connection" => $con
            ];

            $this->request = [
                "params" => [],
                "call" => null,
            ];

            $this->response = [
                "result" => null,
                "error" => ""
            ];

            if ($_SERVER['REQUEST_METHOD'] === 'POST') {

                if (!empty($call) || !empty($_POST['action'])) {

                    $action = filter_var($_POST['action'], FILTER_SANITIZE_URL);
                    $this->request['call'] = !empty($call) ? $call : $action;

                    $this->routeControllerCall();
                } else {
                    throw new Exception("The App needs a request to function.");
                }
            }
        } catch (Exception $e) {

            $this->response['error'] = $e->getMessage();
        }
    }
    private function routeControllerCall()
    {
        try {

            if (empty($this->request['call'])) {
                throw new Exception("Application call cannot be empty.");
            }

            $classObj = null;
            $method = null;

            $callArray = explode("/", $this->request['call']);

            $className = "\\Synaptic4U\\" . ucfirst($callArray[0]) . "\\" . ucfirst($callArray[0]);

            if (class_exists($className)) {
                $classObj = new $className();

                $method = empty($callArray[1]) ? $this->request['call'] : $callArray[1];

                if (method_exists($classObj, $method)) {

                    // echo "Application call: ".$className."->".$method;

                    // $this->response = $classObj->$method($this->request, $this->config);
                    $this->response = call_user_func_array(
                        [
                            $classObj,
                            $method,
                        ],
                        [
                    &
                            $this->request,
                    &
                            $this->config,
                        ]
                    );
                } else {
                    throw new Exception(message: "Method " . $method . " does not exist.");
                }
            } else {
                throw new Exception(message: "Class " . $className . " does not exist.");
            }
        } catch (Exception $e) {
            $this->response['error'] = "Failed to instantiate class: " . $e->getMessage();
        }
    }

    public function response()
    {
        return $this->response;
    }
}
