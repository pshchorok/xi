<?
           session_start();
?>
<meta charset="utf-8">
	<?

  $id=$_POST['id'];
  $pw=$_POST['pw'];
  $phone_part1=$_POST['phone_part1'];
  $phone_part2=$_POST['phone_part2'];
  $phone_part3=$_POST['phone_part3'];
  $email_id=$_POST['email_id'];
  $email_domain=$_POST['email_domain'];

   $ip = $REMOTE_ADDR;         // 방문자의 IP 주소를 저장

   include "dbconn.php";       
      mysqli_query($connect,'set names utf8');  

   $sql = "select * from member where id='$id'";
   $result = mysqli_query( $connect,$sql);
   $exist_id = mysqli_num_rows($result);

   if($exist_id) {
     echo("
           <script>
             window.alert('해당 아이디가 존재합니다.')
             history.go(-1)
           </script>
         ");
         exit;
   }
   else
   {            // 레코드 삽입 명령을 $sql에 입력
    $sql = "insert into member(id, pw, phone_part1, phone_part2, phone_part3, email_id, email_domain) ";
		$sql .= "values('$id', '$pw', '$phone_part1', '$phone_part2','$phone_part3','$email_id', '$email_domain')";

	
		mysqli_query( $connect,$sql);  // $sql 에 저장된 명령 실행
   }

   mysqli_close($connect);            
   echo "
	   <script>
	    location.href = 'member.html';
	   </script>
	";
	
	
	?>