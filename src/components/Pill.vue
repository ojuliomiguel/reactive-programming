<template lang="html">
  <div class="c-pill">
    <span class="name">{{ name }}</span>
    <span class="amount">{{ amount }}</span>
  </div>
</template>

<script>
export default {
  name: "Pill",
  props: {
    name: {
      type: String,
      required: true
    },
    amount: {
      type: Number,
      required: true
    }
  }
};
</script>

<style lang="css">
.c-pill {
  display: flex;
  align-items: center;

  height: 48px;
  margin: 8px 4px;

  border-radius: 32px;

  color: var(--secondary);
  font-size: 1.3rem;
  font-weight: bold;

  background-color: var(--primary);
}

.c-pill .name {
  margin-left: 16px;
}

.c-pill .amount {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 36px;
  height: 36px;

  margin: 8px;
  border-radius: 18px;

  color: var(--primary);
  font-size: 14px;

  background-color: var(--secondary);
}
</style>
