package com.fahad.exceptions;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

	@ExceptionHandler(HttpMessageNotReadableException.class)
	public ResponseEntity<String> emptyBodyException(HttpMessageNotReadableException noData){
		return new ResponseEntity<String>("user details are empty, please enter the details first",
				                            HttpStatus.BAD_REQUEST);
	}
	
	@ExceptionHandler(NullPointerException.class)
	public ResponseEntity<String> missingFieldException(NullPointerException missingData){
		return new ResponseEntity<String>("any of the field is missing, please fill all details first",
				                            HttpStatus.BAD_REQUEST);
	}
	
	@ExceptionHandler(RuntimeException.class)
	public ResponseEntity<String> useNotFoundException(RuntimeException notFound){
		return new ResponseEntity<String>("user is not found/ no previlages for this request",
				                            HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<Map<String, String>> handleValidationErrors(
	        MethodArgumentNotValidException ex) {

	    Map<String, String> errors = new HashMap<>();

	    ex.getBindingResult().getFieldErrors().forEach(error -> {
	        errors.put(error.getField(), error.getDefaultMessage());
	    });

	    return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler(DataIntegrityViolationException.class)
	public ResponseEntity<Map<String , Object>> columnVoilation(DataIntegrityViolationException ex){
		Map<String , Object> response = new HashMap<String, Object>();
		response.put("Time Stamp", LocalDateTime.now());
		response.put("Status", HttpStatus.BAD_REQUEST);
		response.put("Message","Invalid Data: "+ ex.getRootCause().getMessage() );
		return new  ResponseEntity<>(response, HttpStatus.BAD_REQUEST );
	}
	
}
