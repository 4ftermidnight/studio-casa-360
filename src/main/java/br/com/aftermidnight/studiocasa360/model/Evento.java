package br.com.aftermidnight.studiocasa360.model;

import java.io.Serializable;
import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

@Entity
@Table(name = "evento")
public class Evento implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	public Long codigo;
	
	public String titulo;
	
	public String etiquetaDaHora;
	
	public LocalDateTime dataTempoInicio;
	
	public LocalDateTime dataTempoFim;
	 
	public Boolean diaInteiro;
	
	@Transient
	public Boolean dono;
	

	public Evento() {
		super();
	}

	public Evento(Long codigo, String titulo, String etiquetaDaHora, LocalDateTime dataTempoInicio,
			LocalDateTime dataTempoFim, Boolean diaInteiro, Boolean dono) {
		super();
		this.codigo = codigo;
		this.titulo = titulo;
		this.etiquetaDaHora = etiquetaDaHora;
		this.dataTempoInicio = dataTempoInicio;
		this.dataTempoFim = dataTempoFim;
		this.diaInteiro = diaInteiro;
		this.dono = dono;
	}


	public Long getCodigo() {
		return codigo;
	}

	public void setCodigo(Long codigo) {
		this.codigo = codigo;
	}

	public String getTitulo() {
		return titulo;
	}

	public void setTitulo(String titulo) {
		this.titulo = titulo;
	}

	public String getEtiquetaDaHora() {
		return etiquetaDaHora;
	}

	public void setEtiquetaDaHora(String etiquetaDaHora) {
		this.etiquetaDaHora = etiquetaDaHora;
	}

	public LocalDateTime getDataTempoInicio() {
		return dataTempoInicio;
	}

	public void setDataTempoInicio(LocalDateTime dataTempoInicio) {
		this.dataTempoInicio = dataTempoInicio;
	}

	public LocalDateTime getDataTempoFim() {
		return dataTempoFim;
	}

	public void setDataTempoFim(LocalDateTime dataTempoFim) {
		this.dataTempoFim = dataTempoFim;
	}

	public Boolean getDiaInteiro() {
		return diaInteiro;
	}

	public void setDiaInteiro(Boolean diaInteiro) {
		this.diaInteiro = diaInteiro;
	}

	public Boolean getDono() {
		return dono;
	}

	public void setDono(Boolean dono) {
		this.dono = dono;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((codigo == null) ? 0 : codigo.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Evento other = (Evento) obj;
		if (codigo == null) {
			if (other.codigo != null)
				return false;
		} else if (!codigo.equals(other.codigo))
			return false;
		return true;
	}
	
	
	
     
     
}
