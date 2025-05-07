<?php

namespace Synaptic4U\Sort;

use Exception;

/**
 * Class Sort
 *
 * Provides functionality to sort a list of words or phrases provided via a POST request.
 * The input is expected to be a comma-separated string. The class handles empty input
 * and returns an error message if the input is invalid. The sorted result is returned
 * as a comma-separated string.
 */
class Sort
{
    private $response;

    public function __construct()
    {

        $this->response = [
            "input" => null,
            "result" => null,
            "error" => ""
        ];
    }

    public function sort($request, $config)
    {

        $this->response['input'] = $_POST['to_sort'];

        if (empty($this->response['input'])) {
        
            $this->response['error'] = "Please enter some words or phrases to sort seperated by a comma.";
        } else {
        
            $phrases = array_map('trim', explode(',', $this->response['input']));

            $phrases = array_filter($phrases, function ($value) {
        
                return !empty($value);
            });

            if (empty($phrases)) {
        
                $this->response['error'] = "The input cannot contain only commas or empty phrases.";
            } else {
        
                sort($phrases, SORT_STRING);
        
                $this->response['result'] = implode(', ', $phrases);
            }
        }

        return $this->response;
    }
}