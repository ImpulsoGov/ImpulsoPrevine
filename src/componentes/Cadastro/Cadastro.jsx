import { useState } from "react";
import { ButtonColorSubmit } from "../ButtonColor/ButtonColor";
import { CriarSenha } from "../CriarSenha";
import style from "./Cadastro.module.css";

const checkCampos = (data) => {
    const values = Object.values(data);
    const valuesBool = values.map((item) => {
        const validated =
            typeof item != undefined && item != null && item.length > 0
                ? true
                : false;
        return validated;
    });
    return valuesBool.reduce((a) => {
        return a == true ? true : false;
    });
};

const FormCadastro = ({
    titulo,
    message,
    setMessage,
    setEtapa,
    data,

    setNome,
    setMail,
    setCPF,
    setMunicipio,
    setCargo,
    setTelefone,
    setWhatsapp,

    nome,
    mail,
    cpf,
    municipio,
    cargo,
    telefone,
    whatsapp,
}) => {
    const submit = (data) => {
        if (checkCampos(data)) {
            setEtapa(2);
        } else {
            setMessage("Preencha todos os campos");
        }
    };
    return (
        <div className={style.CadastroConteiner}>
            <div className={style.CadastroTitulo}>{titulo}</div>
            <div className={style.CadastroCampos}>
                <input
                    className={style.CadastroCampo}
                    type="text"
                    placeholder="Nome Completo"
                    value={nome}
                    onChange={(e) => {
                        setNome(e.target.value);
                    }}
                />
                <input
                    className={style.CadastroCampo}
                    type="text"
                    placeholder="Município"
                    value={municipio}
                    onChange={(e) => {
                        setMunicipio(e.target.value);
                    }}
                />
                <input
                    className={style.CadastroCampo}
                    type="text"
                    placeholder="Cargo"
                    value={cargo}
                    onChange={(e) => {
                        setCargo(e.target.value);
                    }}
                />
                <input
                    className={style.CadastroCampo}
                    type="text"
                    placeholder="CPF"
                    value={cpf}
                    onChange={(e) => {
                        setCPF(e.target.value);
                    }}
                />
                <input
                    className={style.CadastroCampo}
                    type="text"
                    placeholder="E-mail"
                    value={mail}
                    onChange={(e) => {
                        setMail(e.target.value);
                    }}
                />
                <input
                    className={style.CadastroCampo}
                    type="text"
                    placeholder="Telefone"
                    value={telefone}
                    onChange={(e) => {
                        setTelefone(e.target.value);
                    }}
                />
                <span className={style.CadastroCampoWP}>
                    <input
                        className={style.CadastroCampoCheck}
                        type="checkbox"
                        value={whatsapp}
                        onChange={() => {
                            setWhatsapp(!whatsapp);
                        }}
                    />
                    <label> Esse número possui WhatsApp </label>
                </span>
            </div>
            {message && (
                <div className={style.CadastroMessage}>
                    <p>{message}</p>
                </div>
            )}
            <div className={style.CadastroCampoButton}>
                <ButtonColorSubmit
                    label="Continuar"
                    submit={submit}
                    arg={data}
                />
            </div>
        </div>
    );
};

const Cadastro = ({ titulo, button, submitCadastro, submitCadastroIP }) => {
    const [etapa, setEtapa] = useState(1);
    const [message, setMessage] = useState("");
    const [nome, setNome] = useState("");
    const [municipio, setMunicipio] = useState("");
    const [cargo, setCargo] = useState("");
    const [mail, setMail] = useState("");
    const [senha] = useState("");
    const [cpf, setCPF] = useState("");
    const [telefone, setTelefone] = useState("");
    const [whatsapp, setWhatsapp] = useState(false);
    const data = [
        {
            cadastro_usuario: {
                nome: nome,
                mail: mail,
                senha: senha,
                cpf: cpf,
            },
            cadastro_ip: {
                municipio: municipio,
                cargo: cargo,
                telefone: telefone,
                whatsapp: whatsapp,
                mail: mail,
            },
        },
    ];
    return (
        <>
            {etapa == 1 && (
                <FormCadastro
                    titulo={titulo}
                    button={button}
                    message={message}
                    setMessage={setMessage}
                    setEtapa={setEtapa}
                    data={data[0]["cadastro_ip"]}
                    setNome={setNome}
                    setMail={setMail}
                    setCPF={setCPF}
                    setMunicipio={setMunicipio}
                    setCargo={setCargo}
                    setTelefone={setTelefone}
                    setWhatsapp={setWhatsapp}
                    nome={nome}
                    mail={mail}
                    cpf={cpf}
                    municipio={municipio}
                    cargo={cargo}
                    telefone={telefone}
                    whatsapp={whatsapp}
                />
            )}
            {etapa == 2 && (
                <>
                    <CriarSenha
                        titulo="Crie sua senha"
                        campos={{
                            senha: "Crie sua senha",
                            ConfirmarSenha: "Digite sua senha novamente",
                        }}
                        button={{ label: "Enviar", link: "" }}
                        setEtapa={setEtapa}
                        submitCadastro={submitCadastro}
                        submitCadastroIP={submitCadastroIP}
                        arg={1}
                        data={data}
                    />
                </>
            )}
        </>
    );
};

export { Cadastro };
