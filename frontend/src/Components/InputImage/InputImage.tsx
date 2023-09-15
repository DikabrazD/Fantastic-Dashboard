import { InputImageInterface } from './InputImageInterface'

const InputImage = ({ getSrcImage, getImage }: InputImageInterface) => {
    const changeImage = (x: React.ChangeEvent<HTMLInputElement>) => {
        if (x.target.files) {
            const file = x.target.files[0]
            const reader = new FileReader()

            reader.readAsDataURL(file)
            reader.onload = (e) => {
                if (e.target && getSrcImage) {
                    getSrcImage(String(e.target.result))
                }
            }

            getImage(file)
        }
    }

    return <input type='file' accept='image/png, image/gif, image/jpeg' onChange={changeImage} />
}

export default InputImage
