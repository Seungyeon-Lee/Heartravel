<template>
    <div>
        <CCardGroup class="mb-4">
            <CWidgetProgressIcon
                    header="0"
                    text="결제대기"
                    color="info"
            >
                <CIcon name="cil-people" height="36"/>
            </CWidgetProgressIcon>
            <CWidgetProgressIcon
                    header="0"
                    text="결제완료"
                    color="success"
            >
                <CIcon name="cil-userFollow" height="36"/>
            </CWidgetProgressIcon>
            <CWidgetProgressIcon
                    header="0"
                    text="배송중"
                    color="warning"
            >
                <CIcon name="cil-basket" height="36"/>
            </CWidgetProgressIcon>
            <CWidgetProgressIcon
                    header="0"
                    text="배송완료"
            >
                <CIcon name="cil-chartPie" height="36"/>
            </CWidgetProgressIcon>
            <CWidgetProgressIcon
                    header="0"
                    text="취소/환불"
                    color="danger"
            >
                <CIcon name="cil-speedometer" height="36"/>
            </CWidgetProgressIcon>
        </CCardGroup>
    </div>
</template>

<script>
    export default {
        name: 'AdminMainPage',
        data: () => {
            return {

            }
        }
    }
</script>