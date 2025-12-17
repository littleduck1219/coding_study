package repository;

import littlduck.demo.domain.Member;
import littlduck.demo.repository.MemoryMemberRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

public class MemoryMemberRepositoryTest {
    MemoryMemberRepository repository = new MemoryMemberRepository();

    public void afterEach() {
    repository.clearStore();
    }


    @Test
    public void save() {
        Member member = new Member();
        member.setName("duck");

        repository.save(member);

        Member result = repository.findById(member.getId()).get();
        Assertions.assertEquals(member, result);
    }

    @Test
    public void findByName() {
        Member member1 = new Member();
        member1.setName("duck");
        repository.save(member1);

        Member member2 = new Member();
        member2.setName("duck2");
        repository.save(member2);

        Member result = repository.findByName("duck").get();
        assertThat(result).isEqualTo(member1);
    }

    @Test
    public void findAll() {
        Member member1 = new Member();
        member1.setName("duck");
        repository.save(member1);

        Member member2 = new Member();
        member2.setName("duck1");
        repository.save(member2);

        List<Member> result = repository.findAll();
        assertThat(result.size()).isEqualTo(2);
    }
}
