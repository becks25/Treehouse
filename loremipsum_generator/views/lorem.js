<script>
		

		//initialize the form to empty
		function init(){
			$('#num-text').val("");
			$('.radio-inline').prop('checked', false);
		}

		function validate(){
			var noError = true;
			$('.error').css('display', 'none');
			$('.radio-inline').removeClass("red");
			$('.bg-danger').removeClass('bg-danger');

			//check if a number was entered
			if($('#num-text').val() === "" || $.isNumeric($('#num-text').val()) === false){
				$('#num-text').addClass("bg-danger");
				$('#num-text').closest('.form-group').find('.error').css('display', 'block');
				noError = false;
			}

			//check to see if a radio box was checked
			if($("input:radio[name='typeOfText']").is(":checked") == false){
				$('.radio-inline').addClass("red");
				noError=false;
			}

			return noError;
		}

</script>