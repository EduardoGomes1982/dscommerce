import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ButtonInverse from "../../../components/ButtonInverse";
import ButtonPrimary from "../../../components/ButtonPrimary";
import FormInput from "../../../components/FormInput";
import * as forms from "../../../utils/forms";
import * as productService from "../../../services/product-service";
import "./styles.css";
import FormTextArea from "../../../components/FormTextArea";

export default function ProductForm() {
    const [formData, setFormData] = useState<any>({
        name: {
            value: "",
            id: "name",
            name: "name",
            type: "text",
            placeholder: "Nome",
            validation: (value: string) => {
                return /^.{3,80}$/.test(value);
            },
            message: "O nome deve ter entre 3 e 80 caracteres"
        },
        price: {
            value: "",
            id: "price",
            name: "price",
            type: "number",
            placeholder: "Preço",
            validation: (value: any) => {
                return Number(value) > 0;
            },
            message: "Informe um valor maior que zero"
        },
        imgUrl: {
            value: "",
            id: "imgUrl",
            name: "imgUrl",
            type: "text",
            placeholder: "Imagem"
        },
        description: {
            value: "",
            id: "description",
            name: "description",
            type: "text",
            placeholder: "Descrição do Produto",
            validation: (value: string) => {
                return /^.{10,}$/.test(value);
            },
            message: "A descrição deve ter 10 caracteres ou mais"
        }
    });

    const navigate = useNavigate();
    const params = useParams();
    const isEditing = params.productId !== "create";

    useEffect(() => {
        if (isEditing)
            productService.findById(Number(params.productId))
                .then(response => setFormData(forms.updateAll(formData, response.data)));
    }, [])

    function handleCancelClick() {
        navigate("/admin/products");
    }

    function handleInputChange(event: any) {
        const value = event.target.value;
        const name = event.target.name;
        setFormData(forms.updateAndValidate(formData, name, value));
    }

    function handleInputDirty(event: any) {
        const name = event.target.name;
        setFormData(forms.dirtyAndValidate(formData, name));
    }

    return (
        <main>
            <section id="product-form-section" className="dsc-container">
                <div className="dsc-product-form-container">
                    <form className="dsc-card dsc-form">
                        <h2>Dados do produto</h2>
                        <div className="dsc-form-controls-container">
                            <div>
                                <FormInput {...formData.name} className="dsc-form-control" onChange={handleInputChange}
                                    onBlur={handleInputDirty} />
                                <div className="dsc-form-error">{formData.name.message}</div>
                            </div>
                            <div>
                                <FormInput {...formData.price} className="dsc-form-control" onChange={handleInputChange}
                                    onBlur={handleInputDirty} />
                                <div className="dsc-form-error">{formData.price.message}</div>
                            </div>
                            <div>
                                <FormInput {...formData.imgUrl} className="dsc-form-control" onChange={handleInputChange}
                                    onBlur={handleInputDirty} />
                            </div>
                            <FormTextArea {...formData.description} className="dsc-textarea dsc-form-control" onChange={handleInputChange}
                                onBlur={handleInputDirty} />
                            <div className="dsc-form-error">{formData.description.message}</div>
                        </div>

                        <div className="dsc-product-form-buttons">
                            <ButtonInverse buttonTitle="Cancelar" onButtonClick={handleCancelClick} />
                            <ButtonPrimary buttonTitle="Novo" />
                        </div>
                    </form>
                </div>
            </section>
        </main>
    );
}