<?php
$con = mysqli_connect("localhost","devtestxxx","devtestxxx123123","devtest");

if (mysqli_connect_errno())
{
	echo "Failed to connect to MySQL: " . mysqli_connect_error();
}