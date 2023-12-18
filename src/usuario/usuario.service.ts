import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Usuario } from './usuario.entity';
import { UsuarioCadastrarDto } from './dto/usuario.cadastrar.dto';
import { ResultadoDto } from 'src/dto/resultado.dto';

@Injectable()
export class UsuarioService {
  constructor(
    @Inject('USUARIO_REPOSITORY')
    private usuarioRepository: Repository<Usuario>,
  ) {}

  async listar(): Promise<Usuario[]> { //o metodo finAll funciona como uma listagem de todos os usuarios
    return this.usuarioRepository.find();
  }

  async cadastrar(data: UsuarioCadastrarDto): Promise<ResultadoDto>{
    let usuario = new Usuario()
    usuario.email = data.email
    usuario.name = data.nome
    usuario.password = data.senha
    return this.usuarioRepository.save(usuario)
    .then((result)=>{
          return <ResultadoDto>{
            status: true,
            mensagem: "Usuario Cadastrado com sucesso!"
        }
    })

    .catch((error)=>{

          return <ResultadoDto>{
            status: false,
            mensagem: "Houve um erro ao cadastrar o Usuario."
        }

    })
  }
}