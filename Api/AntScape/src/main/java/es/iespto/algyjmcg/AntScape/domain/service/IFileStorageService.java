package es.iespto.algyjmcg.AntScape.domain.service;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.FileAlreadyExistsException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class IFileStorageService {
	private final Path root = Paths.get("uploads");

	private Path getFilenameFree(String filename) {
		Path pathCompleto = this.root.resolve(filename);
		String nombre = "";
		String extension = "";
		if (filename.contains(".")) {
			extension = filename.substring(filename.lastIndexOf(".") + 1);
			nombre = filename.substring(0, filename.length() - extension.length() - 1);
		} else {
			nombre = filename;
		}
		int contador = 1;
		while (Files.exists(pathCompleto)) {
			String nuevoNombre = nombre + "_" + contador;
			nuevoNombre += "." + extension;
			pathCompleto = this.root.resolve(nuevoNombre);
			contador++;
		}
		return (pathCompleto);
	}

	public String save(String nombrefichero, byte[] dataFile) {
		try {
			Files.createDirectories(root);
		} catch (IOException e) {
			throw new RuntimeException("no se puede crear el directorio");
		}

		try {
			Path filenameFree = getFilenameFree(nombrefichero);
			Files.write(filenameFree, dataFile);
			return filenameFree.getFileName().toString();
		} catch (Exception e) {
			if (e instanceof FileAlreadyExistsException) {
				throw new RuntimeException("A file of that name already exists.");
			}
			throw new RuntimeException(e.getMessage());
		}
	}

	public String save(MultipartFile file) {
		// creamos el directorio si no existe
		try {
			Files.createDirectories(root);
		} catch (IOException e) {
			throw new RuntimeException("no se puede crear el directorio");
		}
		try {
			Path filenameFree = getFilenameFree(file.getOriginalFilename());
			Files.copy(file.getInputStream(), filenameFree);
			return filenameFree.getFileName().toString();
		} catch (Exception e) {
			if (e instanceof FileAlreadyExistsException) {
				throw new RuntimeException("ya existe un fichero llamado así");
			}
			throw new RuntimeException(e.getMessage());
		}
	}

	public Resource get(String filename) {
		try {
			Path pathForFilename = root.resolve(filename);

			Resource resource = new UrlResource(pathForFilename.toUri());

			if (resource.exists()) {
				return resource;
			} else {
				throw new RuntimeException("no se puede acceder a " + filename);
			}

		} catch (MalformedURLException e) {
			throw new RuntimeException("Error: " + e.getMessage());
		}
	}
}