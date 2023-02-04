import { useEffect, useState } from "react";
import { useNavigate, useParams, useSubmit } from "react-router-dom";
import ButtonInverse from "../../../components/ButtonInverse";
import ButtonPrimary from "../../../components/ButtonPrimary";
import FormInput from "../../../components/FormInput";
import FormSelect from "../../../components/FormSelect";
import FormTextArea from "../../../components/FormTextArea";
import { CategoryDTO } from "../../../models/category";
import * as categoryService from "../../../services/category-service";
import * as productService from "../../../services/product-service";
import * as forms from "../../../utils/forms";
import { selectStyles } from "../../../utils/select";
import "./styles.css";

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
        },
        categories: {
            value: [],
            id: "categories",
            name: "categories",
            placeholder: "Categorias",
            validation: (value: CategoryDTO[]) => {
                return value.length > 0;
            },
            message: "Selecione ao menos uma categoria"
        }
    });

    const [categories, setCategories] = useState<CategoryDTO[]>([]);
    const navigate = useNavigate();
    const params = useParams();
    const isEditing = params.productId !== "create";

    useEffect(() => {
        categoryService.findAllRequest().then(response => setCategories(response.data));
        if (isEditing) productService.findById(Number(params.productId)).then(response => setFormData(forms.updateAll(formData, response.data)));
    }, []);

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

    function handleSaveClick() {
        const formaDataValidated = forms.dirtyAndValidateAll(formData);
        if (forms.hasAnyInvalid(formaDataValidated)) {
            setFormData(formaDataValidated);
            return;
        }
        const requestBody = forms.toValues(formaDataValidated);
        if (isEditing) requestBody.id = params.productId;
        const request = isEditing
            ? productService.updateRequest(requestBody)
            : productService.insertRequest(requestBody);
        request
            .then(() => navigate("/admin/products"))
            .catch(error => setFormData(forms.setBackendErrors(formData, error.response.data.errors)));
    }

    return (
        <main>
            <section id="product-form-section" className="dsc-container">
                <div className="dsc-product-form-container">
                    <form className="dsc-card dsc-form">
                        <h2>Dados do produto</h2>
                        <div className="dsc-form-controls-container">
                            <FormInput {...formData.name} className="dsc-form-control" onChange={handleInputChange}
                                onBlur={handleInputDirty} />
                            <div className="dsc-form-error">{formData.name.message}</div>
                            <FormInput {...formData.price} className="dsc-form-control" onChange={handleInputChange}
                                onBlur={handleInputDirty} />
                            <div className="dsc-form-error">{formData.price.message}</div>
                            <FormInput {...formData.imgUrl} className="dsc-form-control" onChange={handleInputChange}
                                onBlur={handleInputDirty} />
                            <FormSelect {...formData.categories} className="dsc-form-control dsc-form-control-container" options={categories}
                                getOptionValue={(e: any) => e.id.toString()} getOptionLabel={(e: any) => e.name} isClearable isMulti
                                onChange={(e: any) => setFormData(forms.updateAndValidate(formData, "categories", e))}
                                onBlur={(e: any) => setFormData(forms.dirtyAndValidate(formData, "categories"))} styles={selectStyles} />
                            <div className="dsc-form-error">{formData.categories.message}</div>
                            <FormTextArea {...formData.description} className="dsc-textarea dsc-form-control" onChange={handleInputChange}
                                onBlur={handleInputDirty} />
                            <div className="dsc-form-error">{formData.description.message}</div>
                        </div>
                        <div className="dsc-product-form-buttons">
                            <ButtonInverse buttonTitle="Cancelar" onButtonClick={handleCancelClick} />
                            <ButtonPrimary buttonTitle="Salvar" onButtonClick={handleSaveClick} />
                        </div>
                    </form>
                </div>
            </section>
        </main>
    );
}