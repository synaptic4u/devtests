<?php

/**
 * QUESTION 3
 *
 * For each month that had sales show a list of customers ordered by who spent the most to who spent least.
 * If the totals are the same then sort by customer.
 * If a customer has multiple products then order those products alphabetical.
 * Months with no sales should not show up.
 * Show the name of the customer, what products they bought and the total they spent.
 * Only show orders with the "Payment received" and "Dispatched" status.
 * If there are no results, then it should just say "There are no results available."
 *
 * Please make sure your code runs as effectively as it can.
 *
 * See test3.html for desired result.
 */
?>
<?php

//$con holds the connection
require_once('db.php');

// Option with autoloading uses a class but is a little slower.
// if (file_exists(dirname(__DIR__, 1).'/vendor/autoload.php')) {

// 	require_once dirname(__DIR__, 1).'/vendor/autoload.php';
// }

// use Synaptic4u\Emile\DBMYSQLI\DBMYSQLI;
function query($con, $query)
{

	try {
		// Prepare the statement
		$stmt = $con->prepare($query);

		// Execute the statement
		$stmt->execute();

		// Get the result set
		$result = $stmt->get_result();

		// Close the statement
		$stmt->close();

		return $result;
	} catch (Exception $e) {

		echo ($e->__toString());
	}
}

$query = "select year(o.order_date) as sales_year, 
				monthname(o.order_date) as sales_month, 
				GROUP_CONCAT(distinct u.first_name, ', ',  u.last_name) as customer,
				group_concat(distinct p.product) as products, sum(p.price) as sales_total 
		  from orders o
		  left join order_items oi
			on o.id = oi.order_id
		  left join products p
			on oi.product_id = p.id 
		  left join users u 
			on o.user_id = u.id 
		 where o.order_status_id  in(1,2,3)
		 group by year(o.order_date), month(o.order_date), monthname(o.order_date), u.last_name, u.first_name
		 order by year(o.order_date) ASC, month(o.order_date) ASC, monthname(o.order_date) ASC,sum(p.price) DESC, u.last_name, u.first_name;";

$result = query($con, $query);

// Change for Autolaoding
// $db = new DBMYSQLI();

// $result = $db->query($query);
?>
<!DOCTYPE html>
<html>

<head>

	<!-- META -->
	<meta charset="UTF-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />

	<!-- TITLE -->
	<title>Test3</title>

	<!-- STYLESHEET -->
	<link rel="stylesheet" href="./css/style.css">
</head>

<body>
	<h1>Top Customers per Month</h1>

	
    <div id="result" class="container-large <?php echo ($result->num_rows > 0) ? '' : 'hidden'; ?>">
        <?php
        if ($result->num_rows > 0) {
            $currentMonth = '';
            while ($row = $result->fetch_assoc()) {
                $monthYear = $row['sales_month'] . ' ' . $row['sales_year'];
                if ($monthYear !== $currentMonth) {
                    if ($currentMonth !== '') {
                        echo '</tbody></table>';
                    }
                    $currentMonth = $monthYear;
                    ?>
                    <h2><?php echo htmlspecialchars($currentMonth); ?></h2>
                    <table width="800">
                        <thead>
                            <tr>
                                <th width="200" align="left">Customer</th>
                                <th width="400" align="left">Products Bought</th>
                                <th width="200" align="right">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                    <?php
                }
                ?>
                <tr>
                    <td valign="top"><?php echo htmlspecialchars($row['customer']); ?></td>
                    <td><?php echo str_replace(',', '<br>', htmlspecialchars($row['products'])); ?></td>
                    <td valign="bottom" align="right"><?php echo 'R ' . number_format($row['sales_total'], 2); ?></td>
                </tr>
                <?php
            }
            echo '</tbody></table>';
        } else {
            ?>
            <div id="message" class="message">
                <h3>There are no results available.</h3>
            </div>
            <?php
        }
        ?>
    </div>
</body>

</html>