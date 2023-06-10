<script>
        $(() => {
         
            var carts =sessionStorage.getItem("cart")
            ? JSON.parse(sessionStorage.getItem("cart"))
            : [];
            var total = 0;
            carts.forEach(c=>{
              total +=Number(c.price)*Number(c.qty);
              $('#tbody').append(`
              <tr>
                      <td>${c.name}</td>
                      <td>${c.price}</td>
                      <td>${c.qty}</td>
                      <td>${Number(c.price)*Number(c.qty)}</td>
                  </tr>
              `);
              
            });
            $('#tbody').append(`
                  <tr>
                      <td colspan="3"></td>
                      <td>${total}</td>
                  </tr>
              `)
          
        });
      </script>