// JavaScript Document
function login_check(){
	var login_name =$('#user_name').val();	
	var email =$('#email').val();
	var validatecode=$('#validatecode').val();	
	var name_Tip = $('#name_Tip'),email_Tip = $('#email_Tip'),validatecode_Tip = $('#validatecode_Tip');
	if(login_name==''){
		$('#name_Tip').html('�����û��������ڣ�');	
		$('#name_Tip').show();
		$('#user_name').focus();
		return false;
	}else{
		$('#name_Tip').hide();
	}
	if(email==''){
		email_Tip.html('ע�����䲻��Ϊ�գ�');	
		email_Tip.show();
		$('#email').focus();
		return false;
	}else{
		email_Tip.hide();
	}
	if(!checkEmail(email)){
		email_Tip.html('ע�������ʽ����ȷ��');	
		email_Tip.show();
		$('#email').focus();
		return false;
	}else{
		email_Tip.hide();
	}
	if(!validatecode){
		  $('#code_span').hide();
		  validatecode_Tip.html('��֤�벻��Ϊ�գ�');	
		  validatecode_Tip.show();
		  return false;			
	  }else{			
		var date = new Date();
		var url = "/dom/ajax_captcha.php?ajax=1&captcha="+validatecode+"&t="+date.getTime();	
		$.post(url,function(data){	
			if(1 == parseInt(data)){
			  validatecode_Tip.show();	
			  $('#code_span').hide();
			  return false;
			}else{
				validatecode_Tip.hide();
				$('#code_span').show();				
			    $('#subing').show();
				$('#sub_now').hide();	
				$('#form2').submit();
			}
		});			
	}
}
