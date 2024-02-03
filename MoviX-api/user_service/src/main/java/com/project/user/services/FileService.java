package com.project.user.services;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;

import org.springframework.web.multipart.MultipartFile;

import com.project.user.exceptions.ForbiddenRequestException;

public interface FileService {

	// method to get image/resources from user
		String uploadImage(String path, MultipartFile file,Long userId) throws IOException, ForbiddenRequestException;

		// method to get resources from database
		InputStream getResource(String path, String fileName) throws FileNotFoundException;
}
