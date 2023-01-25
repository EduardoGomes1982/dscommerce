import ButtomPrimary from "../ButtonPrimary";

export default function DialogInfo() {
    return (
        <div className="dsc-dialog-background">
            <div className="dsc-dialog-box">
                <h2>Operação com Sucesso</h2>
                <ButtomPrimary buttonTitle="Ok" />
            </div>
        </div>
    );
}