import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "../../../components/FormInput";
import * as authService from "../../../services/auth-service";
import { ContextToken } from "../../../utils/context-token";
import * as forms from "../../../utils/forms";
import "./styles.css";

export default function () {
    const [formData, setFormData] = useState<any>({
        username: {
            value: "",
            id: "username",
            name: "username",
            type: "text",
            placeholder: "Email",
            validation: function (value: string) {
                return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value.toLowerCase());
            },
            message: "Favor informar um email válido"
        },
        password: {
            value: "",
            id: "password",
            name: "password",
            type: "password",
            placeholder: "Senha"
        }
    });

    const { setContextTokenPayload } = useContext(ContextToken);
    const navigate = useNavigate();

    function handleSubmit(event: any) {
        event.preventDefault();
        authService.loginRequest(forms.toValues(formData))
            .then((response) => {
                authService.savaAccessToken(response.data.access_token);
                setContextTokenPayload(authService.getAccessTokenPayload());
                navigate("/cart");
            })
            .catch((error) => console.log("Erro no Login", error));
    }

    function handleInputChange(event: any) {
        const value = event.target.value;
        const name = event.target.name;
        const dataValidated = forms.updateAndValidate(formData, name, value);
        setFormData(dataValidated);
    }

    function handleInputDirty(event: any) {
        const name = event.target.name;
        setFormData(forms.dirtyAndValidate(formData, name));
    }

    return (
        <main>
            <section id="login-section" className="dsc-container">
                <div className="dsc-login-form-container">
                    <form className="dsc-card dsc-form" onSubmit={handleSubmit}>
                        <h2>Login</h2>
                        <div className="dsc-form-controls-container">
                            <div>
                                <FormInput {...formData.username} className="dsc-form-control" onChange={handleInputChange}
                                    onBlur={handleInputDirty} />
                                <div className="dsc-form-error">{formData.username.message}</div>
                            </div>
                            <div>
                                <FormInput {...formData.password} className="dsc-form-control" onChange={handleInputChange}
                                    onBlur={handleInputDirty} />
                                <div className="dsc-form-error">{formData.username.message}</div>
                            </div>
                        </div>
                        <div className="dsc-login-form-buttons dsc-mt20">
                            <button type="submit" className="dsc-btn dsc-btn-blue">Entrar</button>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    );
}