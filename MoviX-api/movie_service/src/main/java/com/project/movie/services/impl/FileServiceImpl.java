package com.project.movie.services.impl;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.project.movie.exceptions.ForbiddenRequestException;
import com.project.movie.services.FileService;
import com.project.movie.services.MovieService;

@Service
public class FileServiceImpl implements FileService {
	
	
	@Autowired
	private MovieServiceImpl movieService;

	@Override
	public String uploadImage(String path, MultipartFile file) throws IOException, ForbiddenRequestException {

		if(movieService.checkUserRoleFromUserService())
			throw new ForbiddenRequestException("admin");
		// get file name
		String name = file.getOriginalFilename();
		// hello.png

		// random name generate file
		String randomId = UUID.randomUUID().toString();
		
		String fileName1 = randomId.concat(name.substring(name.lastIndexOf(".")));
		// 9823587fkrwkjkrrjw_8724.png

		// Generate full path
		String filePath = path + File.separator + fileName1;

		// if folder is not present create one
		File f = new File(path);
		if (!f.exists()) {
			f.mkdir();
		}

		// copy file
		Files.copy(file.getInputStream(), Paths.get(filePath));

		return fileName1;
	}

	@Override
	public InputStream getResource(String path, String fileName) throws FileNotFoundException {
		String fullPath = path + File.separator + fileName;

		InputStream is = new FileInputStream(fullPath);

		return is;
	}

}