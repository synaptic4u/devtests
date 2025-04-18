<?php
/**
 * QUESTION 2
 *
 * Using the data stored in the database
 * show a list of products with their prices
 * grouped by category.
 * The categories should be listed in alphabetical order.
 * The products within those categories should also be listed in alphabetical order.
 * Products with no category will be categorized as "Uncategorized".
 * If there are no results, then it should just say "There are no results available."
 *
 * Please make sure your code runs as effectively as it can.
 *
 * See test2.html for desired result.
 */


require_once('db.php');

function query($con, $query)
{
    try {
        $stmt = $con->prepare($query);
        $stmt->execute();
        $result = $stmt->get_result();
        $stmt->close();
        return $result;
    } catch (Exception $e) {
        echo htmlspecialchars($e->__toString());
    }
}

$query = "
    SELECT IFNULL(c.category, 'Uncategorized') AS category, 
           p.product, 
           p.price 
      FROM products p
 LEFT JOIN categories c 
        ON p.category_id = c.id
  ORDER BY category ASC, p.product ASC;";

$result = query($con, $query);
$con->close();
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Test2</title>
    <link rel="stylesheet" href="./css/style.css">
</head>
<body>
    <h1>Products</h1>
    <div id="result" class="container-large <?php echo ($result->num_rows > 0) ? '' : 'hidden'; ?>">
        <?php
        if ($result->num_rows > 0) {
            $currentCategory = '';
            while ($row = $result->fetch_assoc()) {
                if ($row['category'] !== $currentCategory) {
                    if ($currentCategory !== '') {
                        ?>
                        </tbody></table>
                        <?php
                    }
                    $currentCategory = $row['category'];
                    ?>
                    <h2 class="category-title"><?php echo htmlspecialchars($row['category']); ?></h2>
                    <table class="table-customer" style="width:400px;">
                        <thead>
                            <tr class="product-list">
                                <th class="table-heading" style="text-align: start;">Product</th>
                                <th class="table-heading" style="text-align: end;">Price</th>
                            </tr>
                        </thead>
                        <tbody>
				<?php
                }
                ?>
							<tr class="product-item">
								<td style="text-align: start;"><?php echo htmlspecialchars($row['product']); ?></td>
								<td style="text-align: end;"><?php echo '$' . number_format($row['price'], 2); ?></td>
							</tr>
			<?php
            }
            ?>
						</tbody>
					</table>
		<?php
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
